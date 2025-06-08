import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-javascript-level-2',
  standalone: false,
  templateUrl: './javascript-level-2.component.html',
  styleUrl: './javascript-level-2.component.css',
})
export class JavascriptLevel2Component {
  userAnswer: number | null = null;
  feedbackMessage: string = '';

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
        const requiredLevel = 1;

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

  checkAnswer() {
    const correctAnswer = 0; // x - y * 2 => 10 - 5 * 2 = 10 - 10 = 0

    if (this.userAnswer === correctAnswer) {
      this.feedbackMessage =
        '✅ Correcto: Primero se realiza la multiplicación y luego la resta.';
    } else {
      this.feedbackMessage =
        '❌ Incorrecto. Recuerda el orden de las operaciones.';
    }
  }

  async goToNextLevel() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.codetrekService.updateCourseProgress(
          user.uid,
          'javascript',
          2
        );
        await this.codetrekService.addPointsToUser(user.uid, 5);
      } catch (error) {
        console.error('Error guardando progreso:', error);
      }
    } else {
      console.warn('Usuario no autenticado, no se puede guardar progreso');
    }

    // Navegar al siguiente nivel
    this.router.navigate(['course/javascript/level/3']);
  }
}
