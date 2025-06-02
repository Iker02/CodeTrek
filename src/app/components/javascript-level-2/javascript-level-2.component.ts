import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-javascript-level-2',
  standalone: false,
  templateUrl: './javascript-level-2.component.html',
  styleUrl: './javascript-level-2.component.css',
})
export class JavascriptLevel2Component {
  userAnswer: number | null = null;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer() {
    const correctAnswer = 0; // x - y * 2 => 10 - 5 * 2 = 10 - 10 = 0

    if (this.userAnswer === correctAnswer) {
      this.feedbackMessage =
        '✅ Correcto: Primero se realiza la multiplicación y luego la resta.';
    } else {
      this.feedbackMessage =
        '❌ Incorrecto. Recuerda el orden de las operaciones.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/javascript/level/3']);
  }
}
