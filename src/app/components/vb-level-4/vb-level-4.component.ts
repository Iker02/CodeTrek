import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vb-level-4',
  standalone: false,
  templateUrl: './vb-level-4.component.html',
  styleUrl: './vb-level-4.component.css'
})
export class VbLevel4Component {
  feedbackMessage: string = '';
  courseTitle: string = 'visualbasic';
  level: number = 4;

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = 'Correct! Try...Catch...Finally is the proper structure for handling errors in Visual Basic.';
    } else {
      this.feedbackMessage = 'Incorrect. Try again!';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/5`]);
  }
}