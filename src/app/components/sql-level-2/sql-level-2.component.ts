import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-sql-level-2',
  standalone: false,
  templateUrl: './sql-level-2.component.html',
  styleUrl: './sql-level-2.component.css'
})
export class SqlLevel2Component {
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string): Promise<void> {
    if (option === 'option2') {
      this.feedbackMessage = '¡Correcto! WHERE se usa para filtrar resultados que cumplen una condición.';

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'sql', 2);
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta de nuevo.';
    }
  }

  goToNextLevel(): void {
    this.router.navigate(['course/sql/level/3']); 
  }
}
