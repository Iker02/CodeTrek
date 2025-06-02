import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kotlin-level-1',
  standalone: false,
  templateUrl: './kotlin-level-1.component.html',
  styleUrl: './kotlin-level-1.component.css'
})
export class KotlinLevel1Component {
   feedbackMessage: string = '';

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = '¡Correcto! Así se define una función en Kotlin.';
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta nuevamente.';
    }
  }

  goToNextLevel() {
    // Lógica de navegación al siguiente nivel
    this.router.navigate(['course/kotlin/level/2']);
  }

  constructor(private router: Router) {}
}

