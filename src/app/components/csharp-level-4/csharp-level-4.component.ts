import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private router: Router, private translate: TranslateService ) {}

  // Verificar la respuesta del usuario
  checkAnswer(option: string): void {
    this.attempts++;

    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('csharp_level4.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('csharp_level4.incorrect_message');
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
