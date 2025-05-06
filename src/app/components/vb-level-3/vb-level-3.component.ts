import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vb-level-3',
  standalone: false,
  templateUrl: './vb-level-3.component.html',
  styleUrl: './vb-level-3.component.css'
})
export class VbLevel3Component {
  feedbackMessage: string = '';
  courseTitle: string = 'visualbasic';
  level: number = 3;

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option2') {
      this.feedbackMessage = 'Correct! Functions return a value, while Subroutines do not.';
    } else {
      this.feedbackMessage = 'Incorrect. Try again!';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/4`]);
  }
}