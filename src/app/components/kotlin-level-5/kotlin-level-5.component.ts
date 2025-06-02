import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kotlin-level-5',
  standalone: false,
  templateUrl: './kotlin-level-5.component.html',
  styleUrl: './kotlin-level-5.component.css',
})
export class KotlinLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  hintMessage: string = '';
  isCorrect: boolean = false;
  failedAttempts: number = 0;
  showHint: boolean = false;

  constructor(private router: Router) {}

  checkCode() {
    const regex =
      /fun\s+square\s*\(\s*n\s*:\s*Int\s*\)\s*:\s*Int\s*{\s*return\s+n\s*\*\s*n\s*;?\s*}/;

    if (regex.test(this.userCode.trim())) {
      this.isCorrect = true;
      this.feedbackMessage = '¡Correcto! La función está bien definida.';
    } else {
      this.isCorrect = false;
      this.feedbackMessage =
        'Código incorrecto. Intenta definir la función correctamente.';
      this.failedAttempts++;

      if (this.failedAttempts >= 2) {
        this.showHint = true;
      }
    }
  }

  showHintMessage() {
    this.hintMessage =
      'La función debe llamarse square, recibir un parámetro n tipo Int y retornar n * n.';
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
