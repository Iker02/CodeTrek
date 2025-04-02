import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';  // Importar Firebase Auth
import { FirebaseError } from '@firebase/util';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Función para el login con Firebase
  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Si el login es exitoso, se puede redirigir a la página principal
        const user = userCredential.user;
        console.log('User logged in:', user);
        this.router.navigate(['']);  // Redirigir a la página principal (ajusta esta ruta según tu caso)
      })
      .catch((error: FirebaseError) => {
        // Si hay un error, manejarlo
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Error: ' + errorMessage);
      });
  }
}
