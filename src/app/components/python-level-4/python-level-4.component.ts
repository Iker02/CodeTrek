import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-python-level-4',
  standalone: false,
  templateUrl: './python-level-4.component.html',
  styleUrl: './python-level-4.component.css'
})
export class PythonLevel4Component {
  courseTitle: string = 'python';
  level: number = 4;
  feedbackMessage: string = '';

  constructor(private router: Router, private translate: TranslateService) {}

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('python_level4.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('python_level4.incorrect_message');
    }
  }

  checkTupleAnswer(option: string) {
    if (option === 'tupleOption2') {
      this.feedbackMessage = this.translate.instant('python_level4.tuple_correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('python_level4.tuple_inyycorrect_message');
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/5`]);
  }
} 
