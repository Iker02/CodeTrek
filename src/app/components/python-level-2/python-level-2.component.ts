import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-python-level-2',
  standalone: false,
  templateUrl: './python-level-2.component.html',
  styleUrls: ['./python-level-2.component.css']
})
export class PythonLevel2Component {
  courseTitle: string = 'python';
  level: number = 2;
  feedbackMessage: string = '';
  answer: number | null = null;
  correctAnswer: number = 45; // Respuesta correcta de la operación

  constructor(private router: Router) {}

  checkAnswer() {
    // Verificamos si la respuesta del usuario es correcta
    if (this.answer === this.correctAnswer) {
      this.feedbackMessage = '✅ Correct! Great job, you nailed the operation.';
    } else {
      this.feedbackMessage = '❌ Incorrect! That’s not correct. Try again.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/3`]);
  }
}

