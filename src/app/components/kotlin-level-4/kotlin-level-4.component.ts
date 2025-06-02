import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kotlin-level-4',
  standalone: false,
  templateUrl: './kotlin-level-4.component.html',
  styleUrl: './kotlin-level-4.component.css',
})
export class KotlinLevel4Component {
  inputNumber: number | null = null;
  inputResult: number | null = null;
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer() {
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
    } else {
      this.feedbackMessage = `Incorrecto. Intenta de nuevo. Recuerda que la función multiplica el número por 3.`;
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/kotlin/level/5']);
  }
}
