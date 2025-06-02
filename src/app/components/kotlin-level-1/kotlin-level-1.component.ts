import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-kotlin-level-1',
  standalone: false,
  templateUrl: './kotlin-level-1.component.html',
  styleUrls: ['./kotlin-level-1.component.css']
})
export class KotlinLevel1Component {
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = '¡Correcto! Así se define una función en Kotlin.';

      // Guardar progreso en Firestore: nivel 1 de Kotlin
      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'kotlin', 1);
        } catch (error) {
          console.error('Error guardando progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta nuevamente.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/2']);
  }
}
