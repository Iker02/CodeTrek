import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-kotlin-level-4',
  standalone: false,
  templateUrl: './kotlin-level-4.component.html',
  styleUrls: ['./kotlin-level-4.component.css'],
})
export class KotlinLevel4Component {
  inputNumber: number | null = null;
  inputResult: number | null = null;
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
        const currentLanguage = 'kotlin';
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

  async checkAnswer() {
    if (
      this.inputNumber === null ||
      isNaN(this.inputNumber) ||
      this.inputResult === null ||
      isNaN(this.inputResult)
    ) {
      this.feedbackMessage =
        'Por favor, introduce números válidos en ambos campos.';
      return;
    }

    const expectedResult = this.inputNumber * 3;

    if (this.inputResult === expectedResult) {
      this.feedbackMessage = `¡Correcto! El triple de ${this.inputNumber} es ${expectedResult}.`;

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(
            user.uid,
            'kotlin',
            4
          );
          await this.codetrekService.addPointsToUser(user.uid, 5);
        } catch (error) {
          console.error('Error guardando progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = `Incorrecto. Intenta de nuevo. Recuerda que la función multiplica el número por 3.`;
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/5']);
  }
}
