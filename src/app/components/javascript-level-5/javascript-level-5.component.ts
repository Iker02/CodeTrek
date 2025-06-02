import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-javascript-level-5',
  standalone: false,
  templateUrl: './javascript-level-5.component.html',
  styleUrl: './javascript-level-5.component.css'
})
export class JavascriptLevel5Component {
 userCode: string = '';
  feedbackMessage: string = '';
  isCorrect: boolean = false;
  showHint: boolean = false;
  hintMessage: string = '';
  private attempts: number = 0;

  constructor(private router: Router) {}

  checkCode() {
    this.attempts++;
    this.isCorrect = false;
    this.hintMessage = '';
    this.feedbackMessage = '';

    try {
      // Evaluar el código
      const testFunction = new Function(this.userCode + '; return sumar(2, 3);');
      const result = testFunction();

      if (result === 5) {
        this.isCorrect = true;
        this.feedbackMessage = '✅ ¡Correcto! Has completado el nivel final.';
      } else {
        this.feedbackMessage = '❌ El resultado no es correcto. Intenta nuevamente.';
      }
    } catch (error) {
      this.feedbackMessage = '❌ Error en el código: ' + error;
    }

    // Mostrar pista si falló más de 2 veces
    if (this.attempts >= 3 && !this.isCorrect) {
      this.showHint = true;
    }
  }

  showHintMessage() {
    this.hintMessage = 'Recuerda que puedes devolver la suma usando return a + b;';
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
