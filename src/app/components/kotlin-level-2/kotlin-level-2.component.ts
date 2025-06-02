import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-kotlin-level-2',
  standalone: false,
  templateUrl: './kotlin-level-2.component.html',
  styleUrls: ['./kotlin-level-2.component.css'],
})
export class KotlinLevel2Component {
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string) {
    if (option === 'option2') {
      this.feedbackMessage =
        '¡Correcto! Así se define una clase simple en Kotlin con una propiedad.';

      // Guardar progreso en Firestore: nivel 2 de Kotlin
      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'kotlin', 2);
          await this.codetrekService.addPointsToUser(user.uid, 5); 
        } catch (error) {
          console.error('Error guardando progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrecto. Revisa la sintaxis de Kotlin para clases.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/3']);
  }
}
