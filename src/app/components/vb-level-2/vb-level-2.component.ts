import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-vb-level-2',
  standalone: false,
  templateUrl: './vb-level-2.component.html',
  styleUrl: './vb-level-2.component.css'
})
export class VbLevel2Component {
  feedbackMessage: string = '';
  courseTitle: string = 'visualbasic';
  level: number = 2;

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  async checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = 'Correct! That is the correct structure of an If statement in Visual Basic.';
      const user = this.auth.currentUser;
      if (user) {
        try {
          await this.codetrekService.updateCourseProgress(user.uid, this.courseTitle, this.level);
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
    this.router.navigate([`/course/${this.courseTitle}/level/3`]);
  }
}
