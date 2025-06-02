import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sql-level-3',
  standalone: false,
  templateUrl: './sql-level-3.component.html',
  styleUrl: './sql-level-3.component.css',
})
export class SqlLevel3Component {
  answer: number | null = null;
  feedbackMessage: string = '';

  empleados = [
    { id: 1, nombre: 'Ana', cargo: 'Ingeniero' },
    { id: 2, nombre: 'Luis', cargo: 'Analista' },
    { id: 3, nombre: 'Carla', cargo: 'Ingeniero' },
    { id: 4, nombre: 'Pedro', cargo: 'Ingeniero' },
    { id: 5, nombre: 'Marcos', cargo: 'Ingeniero' },
    { id: 6, nombre: 'Laura', cargo: 'Diseñador' },
    { id: 7, nombre: 'Jorge', cargo: 'Ingeniero' },
    { id: 8, nombre: 'Marta', cargo: 'Gerente' },
    { id: 9, nombre: 'Sofía', cargo: 'Analista' },
    { id: 10, nombre: 'Tomás', cargo: 'Ingeniero' },
  ];

  constructor(private router: Router) {}

  checkAnswer(): void {
    const correctAnswer = 6;
    if (this.answer === correctAnswer) {
      this.feedbackMessage =
        '¡Correcto! La consulta devuelve 6 empleados con el cargo de Ingeniero.';
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta de nuevo.';
    }
  }

  goToNextLevel(): void {
    this.router.navigate(['course/sql/level/4']);
  }
}
