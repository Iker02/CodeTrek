import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-python-level-3',
  standalone: false,
  templateUrl: './python-level-3.component.html',
  styleUrl: './python-level-3.component.css'
})
export class PythonLevel3Component {
  courseTitle: string = 'python';
  level: number = 3;
  feedbackMessage: string = '';

  constructor(private router: Router, private translate: TranslateService) {}

  checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('python_level3.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('python_level2.incorrect_message');
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/4`]);
  }
}
