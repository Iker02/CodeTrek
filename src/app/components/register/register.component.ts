import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

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

  // Registrar usuario
  async register() {
    if (this.password !== this.confirmPassword) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    // Necesario rellenar todos los campos
    if (!this.fullName || !this.email || !this.password) {
      await Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // La contraseña tiene que tener más de 6 dígitos
    if (this.password.length < 6) {
      await Swal.fire({
        icon: 'info',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    // Si el correo no incluye "@" --> correo inválido
    if (!this.email.includes('@')) {
      await Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor, introduce un correo electrónico válido.',
      });
      return;
    }

    // Registrar usuario
    const result = await this.codetrekService.registerUser(
      this.fullName,
      this.email,
      this.password,
      this.selectedLanguage
    );

    // Si el usuario se ha registrado correctamente cambiar a su idioma preferido y navegar a pantalla inicial
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
