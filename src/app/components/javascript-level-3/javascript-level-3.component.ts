import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-javascript-level-3',
  standalone: false,
  templateUrl: './javascript-level-3.component.html',
  styleUrl: './javascript-level-3.component.css',
})
export class JavascriptLevel3Component {
  userAnswer: string = '';
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer() {
    const correctAnswer = 'Impar';

    if (this.userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      this.feedbackMessage = '✅ Correcto: 7 es un número impar.';
    } else {
      this.feedbackMessage = '❌ Incorrecto. Vuelve a revisar la condición.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/javascript/level/4']);
  }
}
