// catalogo.component.ts
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent {
  @Output() languageSelected = new EventEmitter<string>();
  searchTerm = '';
  languages = [
    { name: 'Python', image: 'assets/lenguaje-python.jpg' },
    { name: 'JavaScript', image: 'assets/JS-picture.jpg' },
    { name: 'CSharp', image: 'assets/C.jpg' },
    { name: 'HTML', image: 'assets/html-picture.jpg' },
    { name: 'SQL', image: 'assets/SQL.jpg' },
    { name: 'Kotlin', image: 'assets/Kotlin.png' },
    { name: 'Java', image: 'assets/java-picture.jpg' },
    { name: 'VisualBasic', image: 'assets/visualBasic.jpg' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      const search = params['search'];
      if (search) {
        this.searchTerm = decodeURIComponent(search);
      }
    });
  }

  // Filtrar lenguajes
  get filteredLanguages() {
    if (!this.searchTerm) return this.languages;
    const term = this.searchTerm.toLowerCase();
    return this.languages.filter((lang) =>
      lang.name.toLowerCase().includes(term)
    );
  }

  // Navegación al curso del lenguaje seleccionado
  onLanguageSelect(language: string) {
    this.router.navigate([`/catalogo/programming-tutorial/${language}`]);
  }
}
