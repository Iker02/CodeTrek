import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vb-level-5',
  standalone: false,
  templateUrl: './vb-level-5.component.html',
  styleUrl: './vb-level-5.component.css'
})
export class VbLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  isCodeCorrect: boolean = false;
  attempts: number = 0;
  showHintButton: boolean = false;
  showHintMessage: boolean = false;

  constructor(private router: Router) {}

  checkCode() {
    const normalizedCode = this.userCode.replace(/\s+/g, '').toLowerCase();

    const expectedPattern = normalizedCode.includes('dim') &&
                             normalizedCode.includes('asstreamwriter') &&
                             normalizedCode.includes('myfile=') &&
                             normalizedCode.includes('newstreamwriter') &&
                             normalizedCode.includes('myfile.writeline') &&
                             normalizedCode.includes('myfile.close');

    if (expectedPattern) {
      this.feedbackMessage = 'Correct! You handled the file correctly.';
      this.isCodeCorrect = true;
      this.showHintButton = false;
    } else {
      this.feedbackMessage = 'Incorrect. Try again!';
      this.isCodeCorrect = false;
      this.attempts++;

      if (this.attempts >= 2) {
        this.showHintButton = true;
      }
    }
  }

  showHint() {
    this.showHintMessage = true;
    this.showHintButton = false;
  }

  goToNextLevel() {
    this.router.navigate(['/']);
  }
}