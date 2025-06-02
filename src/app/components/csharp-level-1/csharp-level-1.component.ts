import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-csharp-level-1',
  standalone: false,
  templateUrl: './csharp-level-1.component.html',
  styleUrls: ['./csharp-level-1.component.css'],
})
export class CSharpLevel1Component {
  courseTitle: string = 'csharp';
  level: number = 1;
  feedbackMessage: any = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}
  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = this.translate.instant(
        'csharp_level1.correct_message'
      );
    } else {
      this.feedbackMessage = this.translate.instant(
        'csharp_level1.incorrect_message'
      );
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
