import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { FirebaseError } from '@firebase/util';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import {
  collection,
  getDocs,
  query,
  where,
  Firestore,
  getFirestore,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private codetrekService: CodetrekServiceService,
    private firestore: Firestore,
    private translate: TranslateService
  ) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  async login() {
    const auth = getAuth();

    // Intenta iniciar sesión con las credenciales proporcionadas
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      const user = userCredential.user;
      console.log('User logged in:', user);

      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      // Si el usuario existe cambia la foto de perfil y el idioma
      if (userSnap.exists()) {
        const userData = userSnap.data();

        const profileImage =
          userData['profileImageUrl'] || '../assets/profile_icon.webp';
        localStorage.setItem('profileImageUrl', profileImage);

        const userLang = userData['language'] || 'en';
        localStorage.setItem('language', userLang);
        this.translate.use(userLang);
      }

      await this.loadUserProfileImage(user);

      // Navega a la pantalla inicial
      this.router.navigate(['']);
    } catch (error: any) {
      const firebaseError = error as FirebaseError;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: firebaseError.message,
      });
    }
  }

  // Carga la foto de perfil del usuario
  private async loadUserProfileImage(user: User) {
    const q = query(
      collection(this.firestore, 'users'),
      where('uid', '==', user.uid)
    );
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data?.['profileImageUrl']) {
        this.codetrekService.setProfileImageUrl(data['profileImageUrl']);
      }
    });
  }
}
