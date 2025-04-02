import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csharp-level-1',
  standalone: false,
  templateUrl: './csharp-level-1.component.html',
  styleUrls: ['./csharp-level-1.component.css']
})
export class CSharpLevel1Component {
  courseTitle: string = 'csharp';
  level: number = 1;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = '✅ Correct! You can declare an int variable like this: `double number = 25.3;`';
    } else {
      this.feedbackMessage = '❌ Incorrect! That’s not correct. Try again.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/2`]);
  }
}
