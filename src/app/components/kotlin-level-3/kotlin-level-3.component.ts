import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kotlin-level-3',
  standalone: false,
  templateUrl: './kotlin-level-3.component.html',
  styleUrl: './kotlin-level-3.component.css',
})
export class KotlinLevel3Component {
  feedbackMessage: string = '';

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage =
        '¡Correcto! La estructura `when` se usa así en Kotlin.';
    } else {
      this.feedbackMessage =
        'Incorrecto. Esa estructura no corresponde a Kotlin.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/4']);
  }

  constructor(private router: Router) {}
}
