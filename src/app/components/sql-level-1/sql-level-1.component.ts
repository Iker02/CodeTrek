import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-sql-level-1',
  standalone: false,
  templateUrl: './sql-level-1.component.html',
  styleUrl: './sql-level-1.component.css',
})
export class SqlLevel1Component {
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string): Promise<void> {
    if (option === 'option3') {
      this.feedbackMessage =
        '¡Correcto! SELECT se usa para recuperar datos de una tabla.';

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'sql', 1);
          await this.codetrekService.addPointsToUser(user.uid, 5); 
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta de nuevo.';
    }
  }

  goToNextLevel(): void {
    this.router.navigate(['course/sql/level/2']); 
  }
}
