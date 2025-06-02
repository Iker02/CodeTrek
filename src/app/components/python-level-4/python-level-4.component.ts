import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-python-level-4',
  standalone: false,
  templateUrl: './python-level-4.component.html',
  styleUrl: './python-level-4.component.css',
})
export class PythonLevel4Component {
  courseTitle: string = 'python';
  level: number = 4;
  feedbackMessage: string = '';
  isFirstCorrect = false;
  isTupleCorrect = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('python_level4.correct_message');
      this.isFirstCorrect = true;
    } else {
      this.feedbackMessage = this.translate.instant('python_level4.incorrect_message');
      this.isFirstCorrect = false;
    }

    await this.tryUpdateProgress();
  }

  async checkTupleAnswer(option: string) {
    if (option === 'tupleOption2') {
      this.feedbackMessage = this.translate.instant('python_level4.tuple_correct_message');
      this.isTupleCorrect = true;
    } else {
      this.feedbackMessage = this.translate.instant('python_level4.tuple_inyycorrect_message');
      this.isTupleCorrect = false;
    }

    await this.tryUpdateProgress();
  }

  async tryUpdateProgress() {
    if (this.isFirstCorrect && this.isTupleCorrect) {
      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, this.courseTitle, this.level);
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/5`]);
  }
}
