import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-javascript-level-5',
  standalone: false,
  templateUrl: './javascript-level-5.component.html',
  styleUrls: ['./javascript-level-5.component.css']
})
export class JavascriptLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  isCorrect: boolean = false;
  showHint: boolean = false;
  hintMessage: string = '';
  private attempts: number = 0;

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkCode() {
    this.attempts++;
    this.isCorrect = false;
    this.hintMessage = '';
    this.feedbackMessage = '';

    try {
      // Evaluar el código del usuario
      const testFunction = new Function(this.userCode + '; return sumar(2, 3);');
      const result = testFunction();

      if (result === 5) {
        this.isCorrect = true;
        this.feedbackMessage = '✅ ¡Correcto! Has completado el nivel final.';

        // Guardar progreso en Firestore
        const user = this.auth.currentUser;
        if (user) {
          try {
            await this.codetrekService.updateCourseProgress(user.uid, 'javascript', 5);
            await this.codetrekService.addPointsToUser(user.uid, 5); 
          } catch (error) {
            console.error('Error guardando progreso:', error);
          }
        }
      } else {
        this.feedbackMessage = '❌ El resultado no es correcto. Intenta nuevamente.';
      }
    } catch (error) {
      this.feedbackMessage = '❌ Error en el código: ' + error;
    }

    // Mostrar pista si falla más de 2 veces
    if (this.attempts >= 3 && !this.isCorrect) {
      this.showHint = true;
    }
  }

  showHintMessage() {
    this.hintMessage = 'Recuerda que puedes devolver la suma usando return a + b;';
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
