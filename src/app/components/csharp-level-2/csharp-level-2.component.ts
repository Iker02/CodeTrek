import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csharp-level-2',
  standalone: false,
  templateUrl: './csharp-level-2.component.html',
  styleUrls: ['./csharp-level-2.component.css']
})
export class CSharpLevel2Component {
  courseTitle: string = 'csharp';
  level: number = 2;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    // Correct Answer: 20 because multiplication has higher precedence than addition
    if (option === 'option1') {
      this.feedbackMessage = '✅ Correct! The result of a + b * 2 is 20 because multiplication has higher precedence than addition.';
    } else {
      this.feedbackMessage = '❌ Incorrect! That’s not correct. Try again.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/3`]);
  }
}
