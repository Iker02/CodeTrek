import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csharp-level-3',
  standalone: false,
  templateUrl: './csharp-level-3.component.html',
  styleUrls: ['./csharp-level-3.component.css']
})
export class CSharpLevel3Component {
  courseTitle: string = 'csharp';
  level: number = 3;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    // Correct Answer: 1 2 3 because the while loop prints the value of a (1, 2, 3)
    if (option === 'option1') {
      this.feedbackMessage = '✅ Correct! The while loop prints the values of a: 1, 2, and 3.';
    } else {
      this.feedbackMessage = '❌ Incorrect! That’s not correct. Try again.';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/4`]);
  }
}
