import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-python-level-5',
  standalone: false,
  templateUrl: './python-level-5.component.html',
  styleUrl: './python-level-5.component.css'
})
export class PythonLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  hintMessage: string = '';
  isCorrect: boolean = false;
  failedAttempts: number = 0;
  showHint: boolean = false;

  constructor(private router: Router) {}

  checkCode() {
    const correctCode = /def square\s*\(\s*n\s*\)\s*:\s*return\s*n\s*\*\s*n/g;

    if (correctCode.test(this.userCode.trim())) {
      this.isCorrect = true;
      this.feedbackMessage = '✅ Correct! Your function is working perfectly!';
    } else {
      this.isCorrect = false;
      this.feedbackMessage = '❌ Incorrect. Try again.';
      this.failedAttempts++;

      if (this.failedAttempts >= 2) {
        this.showHint = true;
      }
    }
  }

  showHintMessage() {
    this.hintMessage = 'Hint: You need to define a function and return n * n.';
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
