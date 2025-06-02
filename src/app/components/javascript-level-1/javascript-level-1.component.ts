import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-javascript-level-1',
  standalone: false,
  templateUrl: './javascript-level-1.component.html',
  styleUrls: ['./javascript-level-1.component.css'], 
})
export class JavascriptLevel1Component {
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage =
        '✅ Correcto: "console.log()" es la forma correcta de imprimir en la consola en JavaScript.';
    } else {
      this.feedbackMessage = '❌ Incorrecto. Inténtalo de nuevo.';
    }
  }

  async goToNextLevel() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        // Guardar progreso: nivel 1 de 5 para javascript
        await this.codetrekService.updateCourseProgress(user.uid, 'javascript', 1);
      } catch (error) {
        console.error('Error guardando progreso:', error);
      }
    } else {
      console.warn('Usuario no autenticado, no se puede guardar progreso');
    }

    // Navegar al siguiente nivel
    this.router.navigate(['course/javascript/level/2']);
  }
}
