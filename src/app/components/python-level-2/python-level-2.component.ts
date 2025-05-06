import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-python-level-2',
  standalone: false,
  templateUrl: './python-level-2.component.html',
  styleUrls: ['./python-level-2.component.css']
})
export class PythonLevel2Component {
  courseTitle: string = 'python';
  level: number = 2;
  feedbackMessage: string = '';
  answer: number | null = null;
  correctAnswer: number = 45; // Respuesta correcta de la operación

  constructor(private router: Router, private translate: TranslateService) {}

  checkAnswer() {
    // Verificamos si la respuesta del usuario es correcta
    if (this.answer == 45) {
      this.feedbackMessage = this.translate.instant('python_level2.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('python_level2.incorrect_message');
    }
    
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/3`]);
  }
}

