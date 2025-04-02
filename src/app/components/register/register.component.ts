import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodetrekServiceService } from '../../services/codetrek-service.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private codetrekService: CodetrekServiceService, private router: Router) {}

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  navigateToLogin() {
    this.router.navigate(['/login']);
  }


  async register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const result = await this.codetrekService.registerUser(this.fullName, this.email, this.password);
    
    if (result.success) {
      alert('Usuario registrado correctamente 🎉');
    } else {
      alert('Error: Registration failed.');
}
  }
}

