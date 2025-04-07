import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codeTrek';
  isMenuOpen = false;

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Idioma por defecto
  }
  
  dropdownOpen = false;
  selectedLanguage: { flag: string } | null = null; // Empieza sin un idioma seleccionado

  languages = [
    { code: 'es', flag: 'assets/spain-flag-png.webp' },
    { code: 'en', flag: 'assets/usa-flag.png' }
  ];

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCatalog() {
    this.router.navigate(['/catalogo']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cambiarIdioma(languageCode: string) {
    // Cambiar el idioma seleccionado
    const selectedLanguage = this.languages.find(lang => lang.code === languageCode);
    
    // Cambiar el texto del botón al idioma seleccionado
    if (selectedLanguage) {
      this.selectedLanguage = { flag: selectedLanguage.flag };
    }

    // Cambiar el idioma en la aplicación
    this.translate.use(languageCode);  // Aquí es donde se cambia el idioma
    console.log('Idioma seleccionado:', languageCode);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
