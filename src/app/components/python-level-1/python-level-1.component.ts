import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-python-level-1',
  standalone: false,
  templateUrl: './python-level-1.component.html',
  styleUrls: ['./python-level-1.component.css'],
})
export class PythonLevel1Component {
  courseTitle: string = 'python';
  level: number = 1;
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  // Comprobar respuesta
  async checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant(
        'python_level1.correct_message'
      );

      // Guardar en BBDD en el usuario correspondiente el progreso del curso y añadir puntos
      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(
            user.uid,
            this.courseTitle,
            this.level
          );
          await this.codetrekService.addPointsToUser(user.uid, 5);
        } catch (error) {
          console.error('Error guardando progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = this.translate.instant(
        'python_level1.incorrect_message'
      );
    }
  }

  // Navegar al siguiente nivel
  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/2`]);
  }
}
