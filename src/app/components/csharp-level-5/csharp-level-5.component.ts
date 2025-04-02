import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csharp-level-final',
  standalone: false,
  templateUrl: './csharp-level-5.component.html',
  styleUrls: ['./csharp-level-5.component.css']
})
export class CSharpLevel5Component {
  userCode: string = '';
  feedbackMessage: string = '';
  isCorrect: boolean = false;
  showHint: boolean = false;
  hintMessage: string = '';
  attempts: number = 0;

  constructor(private router: Router) {}

  checkCode() {
    // Limpiar los mensajes previos
    this.feedbackMessage = '';
    this.hintMessage = '';
    this.isCorrect = false;

    // Incrementar el contador de intentos
    this.attempts++;

    // Comprobar si el código ingresado es correcto
    if (this.userCode.includes('Array.Reverse(arr)') && this.userCode.includes('Console.WriteLine')) {
      this.isCorrect = true;
      this.feedbackMessage = '🎉 Correct! You have successfully reversed the array.';
    } else {
      this.feedbackMessage = 'Oops! That’s not correct. Try again.';
      if (this.attempts >= 2) {
        this.showHint = true;
      }
    }
  }

  showHintMessage() {
    this.hintMessage = 'Hint: Make sure you are using Array.Reverse() and printing each element with Console.WriteLine().';
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
