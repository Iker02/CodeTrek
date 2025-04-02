import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Course {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'codeTrek';
  isMenuOpen = false;

  constructor(private router: Router) {}
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToCatalog() {
    this.router.navigate(['/catalogo']);
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}