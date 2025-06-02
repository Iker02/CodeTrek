import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-javascript-level-1',
  standalone: false,
  templateUrl: './javascript-level-1.component.html',
  styleUrl: './javascript-level-1.component.css',
})
export class JavascriptLevel1Component {
  feedbackMessage: string = '';

  constructor(private router: Router) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage =
        '✅ Correcto: "console.log()" es la forma correcta de imprimir en la consola en JavaScript.';
    } else {
      this.feedbackMessage = '❌ Incorrecto. Inténtalo de nuevo.';
    }
  }

  goToNextLevel() {
    this.router.navigate(['course/javascript/level/2']);
  }
}
