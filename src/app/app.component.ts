import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodetrekServiceService } from './services/codetrek-service.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, getDoc, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'codeTrek';
  profileImageUrl: string = '../assets/profile_icon.webp';
  isMenuOpen = false;
  isLoggedIn = false;
  private pointsUnsubscribe: (() => void) | undefined; // para limpiar la suscripción
  points: number = 0;
  dropdownOpen = false;
  selectedLanguage: { flag: string } | null = null;
  currentRoute: string = '';

  languages = [
    { code: 'es', flag: 'assets/spain-flag-png.webp' },
    { code: 'en', flag: 'assets/usa-flag.png' },
  ];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {
    const savedLang = localStorage.getItem('language') || 'en';

    // Verificamos que el idioma esté en la lista
    const langToUse = this.languages.some((lang) => lang.code === savedLang)
      ? savedLang
      : 'en';

    // Asignamos el objeto completo (code y flag)
    this.selectedLanguage =
      this.languages.find((lang) => lang.code === langToUse) || null;

    this.translate.setDefaultLang(langToUse);
    this.translate.use(langToUse);

    // Escuchar cambios en la ruta
    this.router.events.subscribe(() => {
      this.updateCurrentRoute();
    });
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      this.isLoggedIn = !!user;

      if (user) {
        // Idioma
        const language = await this.codetrekService.getLanguageByUID(user.uid);
        const languageCode = language || 'en';
        localStorage.setItem('language', languageCode);
        this.translate.use(languageCode);

        this.selectedLanguage =
          this.languages.find((lang) => lang.code === languageCode) || null;

        // Escuchar puntos en tiempo real
        const pointsResult = await this.codetrekService.getUserPoints(
          user.uid,
          (points) => {
            this.points = points;
          }
        );
        this.pointsUnsubscribe = pointsResult.unsubscribe;
      } else {
        this.points = 0;
      }
    });

    // Imagen de perfil
    this.codetrekService.profileImageUrl$.subscribe((url) => {
      this.profileImageUrl = url;
    });
  }

  private updateCurrentRoute() {
    this.currentRoute = this.router.url;
  }

  async cambiarIdioma(languageCode: string) {
    const selectedLanguage = this.languages.find(
      (lang) => lang.code === languageCode
    );

    if (selectedLanguage) {
      this.selectedLanguage = { flag: selectedLanguage.flag };
    }

    this.translate.use(languageCode);
    localStorage.setItem('language', languageCode);

    const user = this.auth.currentUser;
  }

  logout() {
    this.auth.signOut();
    this.isLoggedIn = false; // Actualizar el estado de autenticación
    this.profileImageUrl = '../assets/profile_icon.webp'; // Restablecer la imagen de perfil
    localStorage.removeItem('selectedProfileUrl'); // Limpiar el almacenamiento local
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCatalog() {
    this.router.navigate(['/catalogo']);
  }

  navigateToChallenges() {
    this.router.navigate(['/challenges']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Removed duplicate cambiarIdioma function

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.closest('#menu-toggle-btn')) {
      return;
    }

    // Si el menú está abierto
    if (this.isMenuOpen) {
      const clickedInsideMenu = target.closest('#sidebar-menu');

      // Si NO se hizo clic dentro del menú
      if (!clickedInsideMenu) {
        this.isMenuOpen = false;
      }
    }
  }
}
