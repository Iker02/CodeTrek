import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

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

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkCode() {
    const correctCode = /def\s+square\s*\(\s*n\s*\)\s*:\s*return\s+n\s*\*\s*n/;

    if (correctCode.test(this.userCode.trim())) {
      this.isCorrect = true;
      this.feedbackMessage = this.translate.instant('final_level.correct_message');

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'python', 5);
        } catch (error) {
          console.error('Error guardando el progreso:', error);
        }
      }
    } else {
      this.isCorrect = false;
      this.feedbackMessage = this.translate.instant('final_level.incorrect_message');
      this.failedAttempts++;

      if (this.failedAttempts >= 2) {
        this.showHint = true;
      }
    }
  }

  showHintMessage() {
    this.hintMessage = this.translate.instant('final_level_hint.hint_message');
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
