import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-python-level-1',
  standalone: false,
  templateUrl: './python-level-1.component.html',
  styleUrl: './python-level-1.component.css'
})
export class PythonLevel1Component {
  courseTitle: string = 'python';
  level: number = 1;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = '✅ Correct!! You can declare a variable in Python like this: `age = 25`.';
    } else {
      this.feedbackMessage = '❌ Incorrect! That’s not correct. Try again.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/2`]);
  }
}
