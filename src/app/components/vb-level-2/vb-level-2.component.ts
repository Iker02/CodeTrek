import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vb-level-2',
  standalone: false,
  templateUrl: './vb-level-2.component.html',
  styleUrl: './vb-level-2.component.css'
})
export class VbLevel2Component {
  feedbackMessage: string = '';
  courseTitle: string = 'visualbasic';
  level: number = 2;

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = 'Correct! That is the correct structure of an If statement in Visual Basic.';
    } else {
      this.feedbackMessage = 'Incorrect. Try again!';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/3`]);
  }
}