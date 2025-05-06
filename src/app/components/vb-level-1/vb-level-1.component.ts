import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vb-level-1',
  standalone: false,
  templateUrl: './vb-level-1.component.html',
  styleUrl: './vb-level-1.component.css'
})
export class VbLevel1Component {
  feedbackMessage: string = '';
  courseTitle: string = 'visualbasic';
  level: number = 1;

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = 'Correct! "Dim x As Integer = 10" is the correct way to declare a variable in Visual Basic.';
    } else {
      this.feedbackMessage = 'Incorrect. Try again!';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/2`]);
  }
}