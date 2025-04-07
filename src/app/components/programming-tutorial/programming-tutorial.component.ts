import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-programming-tutorial',
  standalone: false,
  templateUrl: './programming-tutorial.component.html',
  styleUrls: ['./programming-tutorial.component.css'],
})
export class ProgrammingTutorialComponent implements OnInit {
  @Input() language: string = 'SQL'; // Lenguaje por defecto
  @Input() videoUrl: string = ''; // Video de ejemplo

  safeUrl!: SafeResourceUrl;
  documentation: string = '';
selectedLanguage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    // Obtener el parámetro 'title' de la URL
    this.route.params.subscribe(params => {
      this.language = params['title'];  // El lenguaje estará en el parámetro 'title'
      this.setContent();
    });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  navigateToProgrammingTutorial(language: string) {
    this.language = language;
    this.setContent(); 
  }

  navigateToCourse(language: string) {
    this.router.navigate([`/course/${language.toLocaleLowerCase()}`]);
  }

  setContent() {
    const content: { [key: string]: { videoUrl: string, documentation: string } } = {
      Python: {
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.python",
      },
      CSharp: {
        videoUrl: 'https://www.youtube.com/embed/gfkTfcpWqAY?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.csharp",
      },
      VisualBasic: {
        videoUrl: 'https://www.youtube.com/embed/HFWQdGn5DaU?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.visualbasic",
      },
      SQL: {
        videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.sql",
      },
      Kotlin: {
        videoUrl: 'https://www.youtube.com/embed/F9UC9DY-vIU?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.kotlin",
      },
      JavaScript: {
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.javascript",
      },
      Java: {
        videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.java",
      },
      HTML: {
        videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: "course_details.documentation.html",
      },
    };
    const selectedContent = content[this.language];
    this.safeUrl = this.sanitizeUrl(selectedContent.videoUrl);
    this.documentation = selectedContent.documentation;
  }  
}
