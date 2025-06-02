import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-sql-level-4',
  standalone: false,
  templateUrl: './sql-level-4.component.html',
  styleUrl: './sql-level-4.component.css',
})
export class SqlLevel4Component {
  answer: string = '';
  feedbackMessage: string = '';

  empleados = [
    { id: 1, nombre: 'Ana', cargo: 'Ingeniero', salario: 3000 },
    { id: 2, nombre: 'Luis', cargo: 'Analista', salario: 2800 },
    { id: 3, nombre: 'Carla', cargo: 'Ingeniero', salario: 3200 },
    { id: 4, nombre: 'Pedro', cargo: 'Ingeniero', salario: 3100 },
    { id: 5, nombre: 'Marcos', cargo: 'Ingeniero', salario: 2900 },
    { id: 6, nombre: 'Laura', cargo: 'Diseñador', salario: 2750 },
    { id: 7, nombre: 'Jorge', cargo: 'Ingeniero', salario: 2950 },
    { id: 8, nombre: 'Marta', cargo: 'Gerente', salario: 4000 },
    { id: 9, nombre: 'Sofía', cargo: 'Analista', salario: 2700 },
    { id: 10, nombre: 'Tomás', cargo: 'Ingeniero', salario: 3000 },
  ];

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(): Promise<void> {
    const correctAnswer = 'Marta';
    if (this.answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      this.feedbackMessage = '¡Correcto! Marta tiene el salario más alto.';

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, 'sql', 4);
          await this.codetrekService.addPointsToUser(user.uid, 5); 
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta nuevamente.';
    }
  }

  goToNextLevel(): void {
    this.router.navigate(['course/sql/level/5']);
  }
}
