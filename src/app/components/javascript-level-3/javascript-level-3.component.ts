import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-javascript-level-3',
  standalone: false,
  templateUrl: './javascript-level-3.component.html',
  styleUrls: ['./javascript-level-3.component.css'], 
})
export class JavascriptLevel3Component {
  userAnswer: string = '';
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  checkAnswer() {
    const correctAnswer = 'Impar';

    if (this.userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      this.feedbackMessage = '✅ Correcto: 7 es un número impar.';
    } else {
      this.feedbackMessage = '❌ Incorrecto. Vuelve a revisar la condición.';
    }
  }

  async goToNextLevel() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        // Guardar progreso: nivel 3 de 5 para javascript
        await this.codetrekService.updateCourseProgress(user.uid, 'javascript', 3);
        await this.codetrekService.addPointsToUser(user.uid, 5); 
      } catch (error) {
        console.error('Error guardando progreso:', error);
      }
    } else {
      console.warn('Usuario no autenticado, no se puede guardar progreso');
    }

    // Navegar al siguiente nivel
    this.router.navigate(['course/javascript/level/4']);
  }
}
