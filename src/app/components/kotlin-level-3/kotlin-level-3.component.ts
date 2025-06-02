import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-kotlin-level-3',
  standalone: false,
  templateUrl: './kotlin-level-3.component.html',
  styleUrls: ['./kotlin-level-3.component.css'],
})
export class KotlinLevel3Component {
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = '¡Correcto! La estructura `when` se usa así en Kotlin.';

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'kotlin', 3);
        } catch (error) {
          console.error('Error guardando progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrecto. Esa estructura no corresponde a Kotlin.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/4']);
  }
}
