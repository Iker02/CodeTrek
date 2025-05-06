import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Course {
  title: string;
  descriptionKey: string; 
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchText = '';

  search() {
    const encoded = encodeURIComponent(this.searchText.trim());
    this.router.navigate(['/catalogo'], { queryParams: { search: encoded } });
  }

  allCourses: Course[] = [
    { title: "Python", descriptionKey: "homepage.courses.each_course.description_Python", image: "../assets/lenguaje-python.jpg" },
    { title: "CSharp", descriptionKey: "homepage.courses.each_course.description_CSharp", image: "../assets/C.jpg" },
    { title: "VisualBasic", descriptionKey: "homepage.courses.each_course.description_VisualBasic", image: "../assets/visualBasic.jpg" },
    { title: "SQL", descriptionKey: "homepage.courses.each_course.description_SQL", image: "../assets/SQL.jpg" },
    { title: "Kotlin", descriptionKey: "homepage.courses.each_course.description_Kotlin", image: "../assets/Kotlin.png" },
    { title: "JavaScript", descriptionKey: "homepage.courses.each_course.description_JavaScript", image: "../assets/JS-picture.jpg" },
    { title: "Java", descriptionKey: "homepage.courses.each_course.description_Java", image: "../assets/java-picture.jpg" },
    { title: "HTML", descriptionKey: "homepage.courses.each_course.description_HTML", image: "../assets/html-picture.jpg" }
  ];

  displayedCourses: Course[] = this.allCourses.slice(0, 5);
  allCoursesShown = false;

  constructor(private router: Router, private translate: TranslateService) {}

  toggleCourses(): void {
    if (this.allCoursesShown) {
      this.displayedCourses = this.allCourses.slice(0, 5);
    } else {
      this.displayedCourses = this.allCourses.slice(0, 10);
    }
    this.allCoursesShown = !this.allCoursesShown;
  }

  goToCourseDetail(course: Course): void {
    const formattedTitle = course.title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['/course', formattedTitle]);
  }

  // Método para cambiar el idioma
  cambiarIdioma(languageCode: string): void {
    // Cambiar el idioma
    this.translate.use(languageCode);
  }
}
