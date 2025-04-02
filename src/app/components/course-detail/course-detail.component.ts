import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  courseTitle: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.courseTitle = this.route.snapshot.paramMap.get('title') || 'Course not found';
  }

  goBack() {
    this.router.navigate(['/']); 
  }

  goToLevel(level: number) {
    this.router.navigate([`/course/${this.courseTitle}/level/${level}`]);
  }
}
