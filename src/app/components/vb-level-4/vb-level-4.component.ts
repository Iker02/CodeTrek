import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-vb-level-4',
  standalone: false,
  templateUrl: './vb-level-4.component.html',
  styleUrl: './vb-level-4.component.css',
})
export class VbLevel4Component {
  feedbackMessage: string = '';
  courseTitle: string = 'visualbasic';
  level: number = 4;

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const progress = await this.codetrekService.getUserProgressSecurity(
          user.uid
        );
        const currentLanguage = 'visualbasic';
        const requiredLevel = 3;

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
    if (option === 'option3') {
      this.feedbackMessage =
        'Correct! Try...Catch...Finally is the proper structure for handling errors in Visual Basic.';
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
          console.error('Error saving progress:', error);
        }
      }
    } else {
      this.feedbackMessage = 'Incorrect. Try again!';
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/5`]);
  }
}
