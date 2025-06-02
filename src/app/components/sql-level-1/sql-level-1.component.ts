import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sql-level-1',
  standalone: false,
  templateUrl: './sql-level-1.component.html',
  styleUrl: './sql-level-1.component.css',
})
export class SqlLevel1Component {
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string): void {
    if (option === 'option3') {
      this.feedbackMessage =
        '¡Correcto! SELECT se usa para recuperar datos de una tabla.';
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta de nuevo.';
    }
  }

  goToNextLevel(): void {
    this.router.navigate(['course/sql/level/2']); 
  }
}
