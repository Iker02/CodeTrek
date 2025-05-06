import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-csharp-level-2',
  standalone: false,
  templateUrl: './csharp-level-2.component.html',
  styleUrls: ['./csharp-level-2.component.css']
})
export class CSharpLevel2Component {
  courseTitle: string = 'csharp';
  level: number = 2;
  feedbackMessage: string = '';

  constructor(private router: Router, private translate: TranslateService ) {}

  checkAnswer(option: string) {
    // Correct Answer: 20 because multiplication has higher precedence than addition
    if (option === 'option1') {
      this.feedbackMessage = this.translate.instant('csharp_level2.correct_message');
    } else {
      this.feedbackMessage = this.translate.instant('csharp_level2.incorrect_message');
    }
  }

  goToNextLevel() {
    this.router.navigate([`/course/${this.courseTitle}/level/3`]);
  }
}
