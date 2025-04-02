import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  constructor(private router: Router) {}
  @Output() languageSelected = new EventEmitter<string>();

  onLanguageSelect(language: string) {    
    this.router.navigate([`/catalogo/programming-tutorial/${language}`]);
  }
}
