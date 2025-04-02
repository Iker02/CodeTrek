import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Course {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  allCourses: Course[] = [
    { title: "Python", description: "Learn Python from scratch, covering syntax and basic concepts.", image: "../assets/lenguaje-python.jpg" },
    { title: "CSharp", description: "Master the fundamentals of C# for software and game development.", image: "../assets/C.jpg" },
    { title: "VisualBasic", description: "Get started with Visual Basic for simple Windows applications.", image: "../assets/visualBasic.jpg" },
    { title: "SQL", description: "Understand databases and learn to write SQL queries efficiently.", image: "../assets/SQL.jpg" },
    { title: "Kotlin", description: "Learn Kotlin, the modern language for Android development.", image: "../assets/Kotlin.png" },
    { title: "JavaScript", description: "Discover the basics of JavaScript for web development.", image: "../assets/JS-picture.jpg" },
    { title: "Java", description: "Explore Java programming, from OOP to application development.", image: "../assets/java-picture.jpg" },
    { title: "HTML", description: "Learn the fundamentals of HTML to build web pages.", image: "../assets/html-picture.jpg" }
  ];
  

  displayedCourses: Course[] = this.allCourses.slice(0, 5);
  allCoursesShown = false;

  toggleCourses(): void {
    if (this.allCoursesShown) {
      this.displayedCourses = this.allCourses.slice(0, 5);
    } else {
      this.displayedCourses = this.allCourses.slice(0, 10);
    }
    this.allCoursesShown = !this.allCoursesShown;
  }
  

  // Método para navegar a la página de detalles del curso
  goToCourseDetail(course: Course): void {
    const formattedTitle = course.title.replace(/\s+/g, '-').toLowerCase(); // Formatear título para URL
    this.router.navigate(['/course', formattedTitle]);
  }
  
}
