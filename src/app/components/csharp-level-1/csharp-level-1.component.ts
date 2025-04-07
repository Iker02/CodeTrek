import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csharp-level-1',
  standalone: false,
  templateUrl: './csharp-level-1.component.html',
  styleUrls: ['./csharp-level-1.component.css']
})
export class CSharpLevel1Component {
  courseTitle: string = 'csharp';
  level: number = 1;
  feedbackMessage: any = '';

  constructor(private router: Router, private translate: TranslateService ) {}

  checkAnswer(option: string) {
    if (option === 'option3') {
      this.feedbackMessage = this.translate.instant('csharp_level1.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('csharp_level1.incorrect_message');
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/2`]);
  }
}
