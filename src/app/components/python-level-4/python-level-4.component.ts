import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-python-level-4',
  standalone: false,
  templateUrl: './python-level-4.component.html',
  styleUrl: './python-level-4.component.css'
})
export class PythonLevel4Component {
  courseTitle: string = 'python';
  level: number = 4;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = '✅ Correct! Breakdown: Append 60, remove 20, then slice [1:4] → [30, 40, 50].';
    } else {
      this.feedbackMessage = '❌ Incorrect. Hint: Remember how slicing works in lists.';
    }
  }

  checkTupleAnswer(option: string) {
    if (option === 'tupleOption2') {
      this.feedbackMessage = '✅ Yes! Tuples are immutable, meaning their values cannot be changed.';
    } else {
      this.feedbackMessage = '❌ Incorrect. Hint: Tuples cannot be modified after creation.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/5`]);
  }
} 
