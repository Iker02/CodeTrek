import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { Auth } from '@angular/fire/auth';

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

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}
  checkAnswer(option: string) {
    // Correct Answer: 1 2 3 because the while loop prints the value of a (1, 2, 3)
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('csharp_level3.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('csharp_level3.incorrect_message');
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
