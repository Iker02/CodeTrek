import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kotlin-level-2',
  standalone: false,
  templateUrl: './kotlin-level-2.component.html',
  styleUrl: './kotlin-level-2.component.css',
})
export class KotlinLevel2Component {
  feedbackMessage: string = '';

  checkAnswer(option: string) {
    if (option === 'option2') {
      this.feedbackMessage =
        '¡Correcto! Así se define una clase simple en Kotlin con una propiedad.';
    } else {
      this.feedbackMessage =
        'Incorrecto. Revisa la sintaxis de Kotlin para clases.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/3']);
  }

  constructor(private router: Router) {}
}
