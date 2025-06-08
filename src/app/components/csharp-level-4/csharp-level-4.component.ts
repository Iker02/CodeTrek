import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-csharp-level-4',
  standalone: false,
  templateUrl: './csharp-level-4.component.html',
  styleUrls: ['./csharp-level-4.component.css'],
})
export class CSharpLevel4Component {
  feedbackMessage: string = '';
  courseTitle: string = 'csharp';
  level: number = 4;
  attempts: number = 0;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const progress = await this.codetrekService.getUserProgressSecurity(
          user.uid
        );
        const currentLanguage = 'csharp';
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

  // Verificar la respuesta del usuario
  checkAnswer(option: string): void {
    this.attempts++;

    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant(
        'csharp_level4.correct_message'
      );
    } else {
      this.feedbackMessage = this.translate.instant(
        'csharp_level4.incorrect_message'
      );
    }

    // Si el usuario falla más de 2 veces, mostrar la pista
    if (this.attempts > 2) {
      this.feedbackMessage +=
        ' Hint: Remember to check how the list is modified.';
    }
  }

  // Navegar al siguiente nivel cuando la respuesta es correcta
  async goToNextLevel() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        await this.codetrekService.updateCourseProgress(
          user.uid,
          this.courseTitle,
          this.level
        );
        await this.codetrekService.addPointsToUser(user.uid, 5);
        this.router.navigate([
          `/course/${this.courseTitle}/level/${this.level + 1}`,
        ]);
      } catch (error) {
        console.error(
          'Error al guardar el progreso antes de avanzar de nivel:',
          error
        );
      }
    } else {
      console.warn('Usuario no autenticado');
    }
  }
}
