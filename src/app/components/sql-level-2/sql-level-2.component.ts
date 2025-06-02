import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sql-level-2',
  standalone: false,
  templateUrl: './sql-level-2.component.html',
  styleUrl: './sql-level-2.component.css'
})
export class SqlLevel2Component {
 feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string): void {
    if (option === 'option2') {
      this.feedbackMessage = '¡Correcto! WHERE se usa para filtrar resultados que cumplen una condición.';
    } else {
      this.feedbackMessage = 'Incorrecto. Intenta de nuevo.';
    }
  }

  goToNextLevel(): void {
    this.router.navigate(['course/sql/level/3']); 
  }
}
