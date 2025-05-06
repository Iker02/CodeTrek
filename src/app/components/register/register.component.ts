import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private codetrekService: CodetrekServiceService,
    private router: Router,
    private translate: TranslateService,
    private firestore: Firestore
  ) {}

  selectedLanguage: string = 'en';
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }
    
  
    if (!this.fullName || !this.email || !this.password) {
      await Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }
  
    if (this.password.length < 6) {
      await Swal.fire({
        icon: 'info',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }
  
    if (!this.email.includes('@')) {
      await Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor, introduce un correo electrónico válido.',
      });
      return;
    }
  
    const result = await this.codetrekService.registerUser(
      this.fullName,
      this.email,
      this.password,
      this.selectedLanguage
    );
  
    if (result.success) {
      localStorage.setItem('language', this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
      await Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Usuario registrado correctamente 🎉',
      });
      console.log(this.selectedLanguage);
      this.router.navigate(['/']);
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: 'Error: An unexpected error occurred.',
      });
    }
  }
}  