import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-python-level-3',
  standalone: false,
  templateUrl: './python-level-3.component.html',
  styleUrl: './python-level-3.component.css',
})
export class PythonLevel3Component {
  courseTitle: string = 'python';
  level: number = 3;
  feedbackMessage: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const progress = await this.codetrekService.getUserProgressSecurity(
          user.uid
        );
        const currentLanguage = 'python';
        const requiredLevel = 2;

        if (!progress || !progress[currentLanguage]) {
          this.router.navigate(['/bloqueado']);
          return;
        }

        const [currentProgress] = progress[currentLanguage]
          .split('/')
          .map(Number);
        if (currentProgress < requiredLevel) {
          this.router.navigate(['/bloqueado']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async checkAnswer(option: string) {
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant(
        'python_level3.correct_message'
      );

      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(
            user.uid,
            this.courseTitle,
            this.level
          );
          await this.codetrekService.addPointsToUser(user.uid, 5);
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }
    } else {
      this.feedbackMessage = this.translate.instant(
        'python_level2.incorrect_message'
      );
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/4`]);
  }
}
