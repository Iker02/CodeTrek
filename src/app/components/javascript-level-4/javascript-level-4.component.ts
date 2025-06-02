import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-javascript-level-4',
  standalone: false,
  templateUrl: './javascript-level-4.component.html',
  styleUrl: './javascript-level-4.component.css',
})
export class JavascriptLevel4Component {
  feedbackMessage: string = '';
  private answered1 = false;
  private answered2 = false;

  constructor(private router: Router) {}

  checkAnswer(selected: string) {
    const correct = 'option2';
    this.answered1 = true;
    if (selected === correct) {
      this.setFeedback();
    } else {
      this.feedbackMessage = '❌ Una o ambas respuestas son incorrectas.';
    }
  }

  checkArrayAnswer(selected: string) {
    const correct = 'arrayOption3';
    this.answered2 = true;
    if (selected === correct) {
      this.setFeedback();
    } else {
      this.feedbackMessage = '❌ Una o ambas respuestas son incorrectas.';
    }
  }

  private setFeedback() {
    if (this.answered1 && this.answered2) {
      this.feedbackMessage =
        '✅ ¡Correcto! Has respondido ambas preguntas correctamente.';
    } else {
      this.feedbackMessage =
        '⚠️ ¡Una respuesta es correcta! Responde ambas para avanzar.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/javascript/level/5']);
  }
}
