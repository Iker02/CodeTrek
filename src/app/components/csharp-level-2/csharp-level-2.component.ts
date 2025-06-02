import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { Auth } from '@angular/fire/auth';

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

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}
  checkAnswer(option: string) {
    // Correct Answer: 20 because multiplication has higher precedence than addition
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('csharp_level2.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('csharp_level2.incorrect_message');
    }
  }

  async goToNextLevel() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        await this.codetrekService.updateCourseProgress(
          user.uid,
          this.courseTitle,
          this.level
        );
        await this.codetrekService.addPointsToUser(user.uid, 5); 
        this.router.navigate([
          `/course/${this.courseTitle}/level/${this.level + 1}`,
        ]);
      } catch (error) {
        console.error(
          'Error al guardar el progreso antes de avanzar de nivel:',
          error
        );
      }
    } else {
      console.warn('Usuario no autenticado');
    }
  }
}
