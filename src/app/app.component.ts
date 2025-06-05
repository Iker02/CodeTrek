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
  profileImageUrl: string = '../assets/profile_icon.webp'; // Imagen por defecto del perfil
  isMenuOpen = false; // Estado del menú lateral
  isLoggedIn = false; // Estado de autenticación del usuario
  private pointsUnsubscribe: (() => void) | undefined; // Función para cancelar la suscripción a puntos
  points: number = 0; // Puntos del usuario
  dropdownOpen = false; // Estado del dropdown de idioma
  selectedLanguage: { flag: string } | null = null; // Lenguaje seleccionado actualmente
  currentRoute: string = ''; // Ruta actual

  // Lista de idiomas disponibles
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
    const savedLang = localStorage.getItem('language') || 'en'; // Cargar idioma desde localStorage

    // Verificar si el idioma guardado está en la lista
    const langToUse = this.languages.some((lang) => lang.code === savedLang)
      ? savedLang
      : 'en';

    // Asignar el lenguaje seleccionado
    this.selectedLanguage =
      this.languages.find((lang) => lang.code === langToUse) || null;

    // Establecer idioma por defecto y usarlo
    this.translate.setDefaultLang(langToUse);
    this.translate.use(langToUse);

    // Escuchar cambios de ruta para actualizar la ruta actual
    this.router.events.subscribe(() => {
      this.updateCurrentRoute();
    });
  }

  // Se ejecuta al iniciar le componente
  ngOnInit() {
    // Escuchar los cambios de estado de autenticación
    onAuthStateChanged(this.auth, async (user) => {
      this.isLoggedIn = !!user; // true si hay usuario logueado

      if (user) {
        // Idioma elegido por el usuario desde BBDD
        const language = await this.codetrekService.getLanguageByUID(user.uid);
        const languageCode = language || 'en';
        localStorage.setItem('language', languageCode); // Guardar en localStorage
        this.translate.use(languageCode); // Cambiar idioma en la app

        // Cambiar el lenguaje seleccionado
        this.selectedLanguage =
          this.languages.find((lang) => lang.code === languageCode) || null;

        // Puntos del usuario actual
        const pointsResult = await this.codetrekService.getUserPoints(
          user.uid,
          (points) => {
            this.points = points;
          }
        );
        this.pointsUnsubscribe = pointsResult.unsubscribe; // Guardar la función para cancelar luego
      } else {
        this.points = 0; // Si no está logeado puntos = 0
      }
    });

    // Cambios de la imagen del perfil
    this.codetrekService.profileImageUrl$.subscribe((url) => {
      this.profileImageUrl = url;
    });
  }

  // Método para actualizar la ruta actual
  private updateCurrentRoute() {
    this.currentRoute = this.router.url;
  }

  // Método para cambiar el idioma de la app
  async cambiarIdioma(languageCode: string) {
    const selectedLanguage = this.languages.find(
      (lang) => lang.code === languageCode
    );

    if (selectedLanguage) {
      this.selectedLanguage = { flag: selectedLanguage.flag }; // Cambiar bandera seleccionada
    }

    this.translate.use(languageCode); // Aplicar idioma
    localStorage.setItem('language', languageCode); // Guardar en localStorage

    const user = this.auth.currentUser; // Obtener usuario actual
  }

  // Método para cerrar sesión
  logout() {
    this.auth.signOut(); // Cerrar sesión
    this.isLoggedIn = false; // Actualizar estado a falso
    this.profileImageUrl = '../assets/profile_icon.webp'; // Cambiar a la imagen de perfil por defecto
    localStorage.removeItem('selectedProfileUrl'); // Limpiar localStorage
    this.router.navigate(['/']); // Redirigir a inicio
  }

  // Navegación a distintas rutas
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

  // Abrir/cerrar menú lateral
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Abrir/cerrar dropdown de idioma
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Escucha clicks
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Si se hizo click en el botón de abrir/cerrar menú, no hacer nada
    if (target.closest('#menu-toggle-btn')) {
      return;
    }

    // Si el menú está abierto y el click fue fuera del menú, se cierra
    if (this.isMenuOpen) {
      const clickedInsideMenu = target.closest('#sidebar-menu');

      if (!clickedInsideMenu) {
        this.isMenuOpen = false;
      }
    }
  }
}
