import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-csharp-level-final',
  standalone: false,
  templateUrl: './csharp-level-5.component.html',
  styleUrls: ['./csharp-level-5.component.css']
})
export class CSharpLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  isCorrect: boolean = false;
  showHint: boolean = false;
  hintMessage: string = '';
  attempts: number = 0;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  checkCode() {
    this.feedbackMessage = '';
    this.hintMessage = '';
    this.isCorrect = false;
    this.attempts++;

    if (this.userCode.includes('Array.Reverse(arr)') && this.userCode.includes('Console.WriteLine')) {
      this.isCorrect = true;
      this.feedbackMessage = this.translate.instant('CSharpFinalLevel.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('CSharpFinalLevel.incorrect_message');
      if (this.attempts >= 2) {
        this.showHint = true;
      }
    }
  }

  showHintMessage() {
    this.hintMessage = 'Hint: Make sure you are using Array.Reverse() and printing each element with Console.WriteLine().';
  }

  async goHome() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.codetrekService.updateCourseProgress(user.uid, 'csharp', 5);
        await this.codetrekService.addPointsToUser(user.uid, 5); 
      } catch (error) {
        console.error('Error guardando progreso final:', error);
      }
    } else {
      console.warn('Usuario no autenticado');
    }
    this.router.navigate(['/']);
  }
}
