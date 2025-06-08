import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-javascript-level-4',
  standalone: false,
  templateUrl: './javascript-level-4.component.html',
  styleUrls: ['./javascript-level-4.component.css'],
})
export class JavascriptLevel4Component {
  feedbackMessage: string = '';
  private answered1 = false;
  private answered2 = false;

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const progress = await this.codetrekService.getUserProgressSecurity(
          user.uid
        );
        const currentLanguage = 'javascript';
        const requiredLevel = 3;

        if (!progress || !progress[currentLanguage]) {
          this.router.navigate(['/bloqueado']);
          return;
        }

        const [currentProgress] = progress[currentLanguage]
          .split('/')
          .map(Number);
        if (currentProgress < requiredLevel) {
          this.router.navigate(['/bloqueado']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  checkAnswer(selected: string) {
    const correct = 'option2';
    this.answered1 = true;

    if (selected === correct) {
      this.setFeedback();
    } else {
      this.feedbackMessage = '❌ Una o ambas respuestas son incorrectas.';
    }
  }

  checkArrayAnswer(selected: string) {
    const correct = 'arrayOption3';
    this.answered2 = true;

    if (selected === correct) {
      this.setFeedback();
    } else {
      this.feedbackMessage = '❌ Una o ambas respuestas son incorrectas.';
    }
  }

  private setFeedback() {
    if (this.answered1 && this.answered2) {
      this.feedbackMessage =
        '✅ ¡Correcto! Has respondido ambas preguntas correctamente.';
    } else {
      this.feedbackMessage =
        '⚠️ ¡Una respuesta es correcta! Responde ambas para avanzar.';
    }
  }

  async goToNextLevel() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.codetrekService.updateCourseProgress(
          user.uid,
          'javascript',
          4
        );
        await this.codetrekService.addPointsToUser(user.uid, 5);
      } catch (error) {
        console.error('Error guardando progreso:', error);
      }
    } else {
      console.warn('Usuario no autenticado, no se puede guardar progreso');
    }

    this.router.navigate(['course/javascript/level/5']);
  }
}
