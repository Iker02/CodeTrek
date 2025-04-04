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
        documentation: `🐍 Python is a versatile, high-level language known for its simplicity and broad applications in web development, data science, AI, automation, and cybersecurity.

Its clear syntax makes it beginner-friendly, while its extensive standard library, cross-platform support, and active community make it powerful for experts.

Used in frameworks like Django and Flask, and tools like Pandas and TensorFlow, Python is essential for web development, data analysis, automation, and IoT.

Companies like Google, Netflix, and NASA rely on it, making Python a top choice for both beginners and professionals. `,
      },
      CSharp: {
        videoUrl: 'https://www.youtube.com/embed/gfkTfcpWqAY?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `C# is a programming language developed by Microsoft, widely used in desktop application development, video games with Unity, and enterprise applications.

Its main features include modern syntax, support for object-oriented programming, and deep integration with the .NET platform. C# is known for its performance and robustness in building large-scale applications.

It is the primary language for creating video games in Unity, enabling the development of 2D and 3D games. It is also common in enterprise application development and mobile app development via Xamarin.`,
      },
      VisualBasic: {
        videoUrl: 'https://www.youtube.com/embed/HFWQdGn5DaU?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `Visual Basic is a programming language developed by Microsoft, designed to be easy to learn and widely used in desktop and enterprise applications.

Through its integration with the Visual Studio development environment, Visual Basic allows for the creation of Windows applications, databases, and process automation. Although not as popular as other languages, it is still used in many legacy systems and enterprise environments.

Its key features are ease of use, simple syntax, and rapid creation of graphical interfaces through the use of visual forms.`,
      },
      SQL: {
        videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `SQL (Structured Query Language) is a language used to manage relational databases. It allows you to create, read, update, and delete data (CRUD) from databases.

SQL is widely used in applications that require storage and manipulation of large amounts of data. With SQL, you can perform complex queries, join tables, aggregate data, and filter efficiently.

There are several database management systems (DBMS) that implement SQL, such as MySQL, PostgreSQL, Microsoft SQL Server, and Oracle Database.`,
      },
      Kotlin: {
        videoUrl: 'https://www.youtube.com/embed/F9UC9DY-vIU?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `Kotlin is a modern and concise programming language, primarily used in Android app development. It is fully interoperable with Java and allows for cleaner code with fewer errors.

Kotlin is known for its modern, safe syntax that reduces common errors like NullPointerException. It also supports functional and object-oriented programming, making it a versatile and powerful language.

In addition to Android, Kotlin is also used to develop web apps, server apps, and cross-platform applications using frameworks like Kotlin Multiplatform.`,
      },
      JavaScript: {
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `JavaScript is the primary programming language for web development. It allows you to add interactivity to web pages, handle events, and make asynchronous requests to the server, all in real-time.

Along with HTML and CSS, JavaScript is the backbone of modern web development. With the advent of Node.js, JavaScript has also gained popularity in server-side development.

Today, JavaScript is the most widely used language for developing interactive web applications and is widely used in frameworks like React, Angular, and Vue.js.`,
      },
      Java: {
        videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `Java is an object-oriented programming language widely used for enterprise applications, mobile apps, and backend systems.

It is known for its robustness, portability, and compatibility with various platforms. Java allows you to write code once and run it anywhere, making it a great option for distributed systems and large-scale applications.

Java is widely used in Android app development and in enterprise server environments. Frameworks like Spring and Hibernate have solidified it as a reliable choice in the software industry.`,
      },
      HTML: {
        videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU?autoplay=1&controls=1&showinfo=0&modestbranding=1&rel=0',
        documentation: `HTML (HyperText Markup Language) is the standard markup language used to structure web page content. It defines the elements that make up a web page, such as headers, paragraphs, links, and lists.

Along with CSS and JavaScript, HTML is fundamental to the development of interactive websites. It is the foundation of any modern web page and serves to describe content in a hierarchical and semantic manner.

HTML5 is the latest version of HTML and has introduced new tags to improve accessibility and interactivity on web pages.`,
      },
    };


    const selectedContent = content[this.language];
    this.safeUrl = this.sanitizeUrl(selectedContent.videoUrl);
    this.documentation = selectedContent.documentation;
  }
}
