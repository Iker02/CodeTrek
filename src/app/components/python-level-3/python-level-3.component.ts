import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-python-level-3',
  standalone: false,
  templateUrl: './python-level-3.component.html',
  styleUrl: './python-level-3.component.css'
})
export class PythonLevel3Component {
  courseTitle: string = 'python';
  level: number = 3;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = '✅ Correct! Breakdown: (a or b) → True, (b and c) → False, not False → True. So, True and True → True.';
    } else {
      this.feedbackMessage = '❌ Incorrect. Hint: Break the expression into steps and evaluate them one by one.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/4`]);
  }
}
