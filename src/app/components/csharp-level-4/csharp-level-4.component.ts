import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csharp-level-4',
  standalone: false,
  templateUrl: './csharp-level-4.component.html',
  styleUrls: ['./csharp-level-4.component.css']
})
export class CSharpLevel4Component {
  feedbackMessage: string = '';
  courseTitle: string = 'csharp';
  level: number = 4;
  attempts: number = 0;

  constructor(private router: Router) {}

  // Verificar la respuesta del usuario
  checkAnswer(option: string): void {
    this.attempts++;

    if (option === 'option1') {
      this.feedbackMessage = '✅ Correct! The output is: 3 10 30 40 50.';
    } else {
      this.feedbackMessage = '❌ Incorrect! That’s not correct. Try again.';
    }

    // Si el usuario falla más de 2 veces, mostrar la pista
    if (this.attempts > 2) {
      this.feedbackMessage += ' Hint: Remember to check how the list is modified.';
    }
  }

  // Navegar al siguiente nivel cuando la respuesta es correcta
  goToNextLevel(): void {
    this.router.navigate([`/course/${this.courseTitle}/level/5`]);
  }
}
