import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from '@angular/fire/auth';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

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
export class HomeComponent implements OnInit {

  searchText = '';

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

  // Progreso de cursos (nivel completado / total niveles)
  progress: { [key: string]: string } = {};

  totalLevels = 5;

  constructor(
    private router: Router, 
    private translate: TranslateService,
    private codetrekService: CodetrekServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.loadProgress();
  }

  async loadProgress() {
    const user = this.auth.currentUser;
    if (user) {
      try {
        const data = await this.codetrekService.getUserProgress(user.uid);
        // Por cada curso, si hay progreso asignarlo, si no poner "0/5"
        this.allCourses.forEach(course => {
          // normalizamos el título para key en minúscula sin espacios
          const key = course.title.toLowerCase();
          const levelDone = data && data[key] ? data[key] : 0;
          this.progress[key] = `${levelDone}/${this.totalLevels}`;
        });
      } catch (error) {
        console.error('Error loading progress:', error);
        // En caso de error inicializar todo a 0/5
        this.allCourses.forEach(course => {
          const key = course.title.toLowerCase();
          this.progress[key] = `0/${this.totalLevels}`;
        });
      }
    } else {
      // Si no hay usuario logueado, progreso por defecto a 0/5
      this.allCourses.forEach(course => {
        const key = course.title.toLowerCase();
        this.progress[key] = `0/${this.totalLevels}`;
      });
    }
  }

  search() {
    const encoded = encodeURIComponent(this.searchText.trim());
    this.router.navigate(['/catalogo'], { queryParams: { search: encoded } });
  }

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

  cambiarIdioma(languageCode: string): void {
    this.translate.use(languageCode);
  }
}
