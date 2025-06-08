import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-sql-level-5',
  standalone: false,
  templateUrl: './sql-level-5.component.html',
  styleUrl: './sql-level-5.component.css',
})
export class SqlLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  hintMessage: string = '';
  isCorrect: boolean = false;
  failedAttempts: number = 0;
  showHint: boolean = false;

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
        const currentLanguage = 'sql';
        const requiredLevel = 4;

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

  async checkCode() {
    const normalized = this.userCode.trim().replace(/\s+/g, ' ').toLowerCase();

    const correctQuery = `insert into empleados (id, nombre, cargo, salario) values (11, 'natalia', 'diseñador', 2800)`;

    if (normalized === correctQuery) {
      this.isCorrect = true;
      this.feedbackMessage =
        '¡Correcto! Has insertado el registro correctamente.';

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'sql', 5);
          await this.codetrekService.addPointsToUser(user.uid, 5);
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }
    } else {
      this.isCorrect = false;
      this.feedbackMessage = 'La consulta no es correcta. Intenta nuevamente.';
      this.failedAttempts++;

      if (this.failedAttempts >= 2) {
        this.showHint = true;
      }
    }
  }

  showHintMessage() {
    this.hintMessage = `Recuerda usar: INSERT INTO empleados (columnas) VALUES (...)`;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
