import { Component, HostListener, OnInit } from '@angular/core';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import {
  Auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updatePassword,
} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  screenSize: 'sm' | 'md' | 'xl' | '2xl' = 'xl';
  showPopup = false;

  profilePictures: string[] = [];
  selectedProfile: number | null = null;
  userEmail: string = '';
  userPassword: string = '';
  userName: string = '';
  showPasswordModal: boolean = false;
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  nombreCompleto: string = '';
  nuevoNombre = '';
  nuevoCorreo = '';
  correoActual = '';
  showNameModal: boolean = false;
  showEmailModal: boolean = false;

  constructor(
    private codetrekService: CodetrekServiceService,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.updateScreenSize();
    this.loadProfilePictures();
    this.loadUserEmail();
    await this.loadUserName();
  }

  // Método para mostrar el modal de cambio de nombre
  openNameModal() {
    this.showNameModal = true;
  }

  // Método para mostrar el modal de cambio de correo
  openEmailModal() {
    this.showEmailModal = true;
  }

  // Añadir imagenes de perfil a Firestore
  async addProfilePicturesToFirestore() {
    const urls = [
      'https://i.pinimg.com/736x/4a/4e/2b/4a4e2b8a7a3924d99a3fda592b7cbca4.jpg',
      'https://tse1.mm.bing.net/th/id/OIP.FAzhrVU7bLj0U6sdFlYnQQHaHa?rs=1&pid=ImgDetMain',
      'https://tse3.mm.bing.net/th/id/OIP.xE54AWD_CSsSZ6NmAOJ01QHaHa?rs=1&pid=ImgDetMain',
      'https://nextluxury.com/wp-content/uploads/funny-profile-pictures-7.jpg',
      'https://tse3.mm.bing.net/th/id/OIP.ucp9jnKMdPPQV2ysU84UbwHaGa?rs=1&pid=ImgDetMain',
      'https://tse1.explicit.bing.net/th/id/OIP.oQ6kN7S7M07iqVQzwIVY1gAAAA?rs=1&pid=ImgDetMain',
      'https://wallpapers.com/images/hd/funny-profile-picture-9gkayiu1i7j211fg.jpg',
      'https://tse1.mm.bing.net/th/id/OIP.4dshjW5ZnZAlkLuXHVM_gwAAAA?w=400&h=380&rs=1&pid=ImgDetMain',
      'https://i.pinimg.com/736x/a1/62/2e/a1622e6c8930a8a0248e7a4b5cc71427.jpg',
      'https://i.pinimg.com/736x/4a/10/11/4a1011167658e8fc296ba1c7a52b0bb9.jpg',
      'https://i.pinimg.com/originals/36/75/cd/3675cd3eb81ce4317bb2efc399986b7a.jpg',
      'https://tse1.mm.bing.net/th/id/OIP._eS9HDqmTa1pyphRoNtsiAHaHb?rs=1&pid=ImgDetMain',
      'https://nextluxury.com/wp-content/uploads/funny-profile-pictures-17.png',
      'https://tse2.mm.bing.net/th/id/OIP.tnCuL2OKeDdfGb5pAq46zwHaHV?rs=1&pid=ImgDetMain',
      'https://i.pinimg.com/736x/33/b7/62/33b762e7d33f3cf3ca59977d3e26e5ee.jpg',
      'https://i.pinimg.com/originals/ae/1f/ea/ae1fea5b58c911dc403d44cd3a1c0c9a.jpg',
      'https://i.pinimg.com/originals/26/a5/4f/26a54f4440e3ed0f28d2350733968f52.png',
      'https://tse4.mm.bing.net/th/id/OIP.oaMZcOy7maG9h3vHLKwDAwHaD8?rs=1&pid=ImgDetMain',
      '',
    ];

    const collectionRef = collection(this.firestore, 'profile_pictures');

    for (const url of urls) {
      await addDoc(collectionRef, { url });
      console.log(`Agregado: ${url}`);
    }

    console.log('✅ Todas las imágenes fueron agregadas a Firestore');
  }

  // Método cambiar contraseña
  async changePassword() {
    // Se necesita la contraseña actual, la nueva y confirmarla
    if (
      !this.currentPassword ||
      !this.newPassword ||
      !this.confirmNewPassword
    ) {
      Swal.fire('Oops', 'All fields are required.', 'warning');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      Swal.fire('Oops', 'Passwords do not match.', 'error');
      return;
    }

    if (this.newPassword.length < 6) {
      Swal.fire('Oops', 'Password must be at least 6 characters.', 'info');
      return;
    }

    const user = this.auth.currentUser;
    if (user && user.email) {
      const credentials = EmailAuthProvider.credential(
        user.email,
        this.currentPassword
      );

      // Cambiar credenciales en el Auth
      try {
        await reauthenticateWithCredential(user, credentials);
        await updatePassword(user, this.newPassword);
        Swal.fire('Success', 'Password updated successfully 🎉', 'success');
        this.showPasswordModal = false;
        this.currentPassword = this.newPassword = this.confirmNewPassword = '';
      } catch (error) {
        Swal.fire('Error', (error as any).message, 'error');
      }
    }
  }

  // Actualizar avatar
  updateAvatar(toggle?: HTMLInputElement) {
    this.showPopup = false;

    if (
      this.selectedProfile !== null &&
      this.profilePictures[this.selectedProfile]
    ) {
      const selectedUrl = this.profilePictures[this.selectedProfile];
      const currentUser = this.auth.currentUser;

      if (currentUser) {
        // Actualizar el avatar del usuario en Firestore
        this.codetrekService.updateUserProfileImage(
          currentUser.uid,
          selectedUrl
        );

        // Actualizar la imagen en la aplicación
        this.codetrekService.setProfileImageUrl(selectedUrl);
        localStorage.setItem('profileImageUrl', selectedUrl);
      }
    }

    // Si el toggle está activo, lo desactivamos
    if (toggle && toggle.checked) {
      toggle.checked = false;
    }
  }

  loadUserEmail() {
    const user = this.auth.currentUser;
    if (user) {
      this.userEmail = user.email || '';
    }
  }

  async loadUserName() {
    const user = this.auth.currentUser;

    if (user) {
      const uid = user.uid;
      let nombreCompleto = await this.codetrekService.getFullNameByUID(uid);
      this.nombreCompleto = nombreCompleto || '';
    } else {
      console.log('No hay usuario autenticado');
      this.nombreCompleto = '';
    }
  }

  cambiarNombre() {
    const nuevo = this.nuevoNombre.trim();

    if (nuevo) {
      this.codetrekService
        .updateDisplayName(nuevo)
        .then(() => {
          this.nombreCompleto = nuevo;
          this.nuevoNombre = '';
          Swal.fire('Success', 'Name updated successfully 🎉', 'success');
        })
        .catch((error) => {
          console.error('Error al actualizar el nombre', error);
          Swal.fire('Error', 'No se pudo actualizar el nombre', 'error');
        });
    }
  }

  cambiarCorreo() {
    const nuevoCorreo = this.nuevoCorreo.trim();

    if (nuevoCorreo) {
      const user = this.auth.currentUser;

      // Si el correo no está verificado, enviamos el correo de verificación
      if (user && !user.emailVerified) {
        sendEmailVerification(user)
          .then(() => {
            Swal.fire(
              'Verificación pendiente',
              'Te hemos enviado un correo de verificación. Revisa tu bandeja de entrada.',
              'info'
            );
          })
          .catch((error) => {
            console.error('Error al enviar el correo de verificación:', error);
            Swal.fire(
              'Error',
              'No se pudo enviar el correo de verificación',
              'error'
            );
          });
      } else {
        // Si el correo está verificado o ya ha sido verificado
        this.codetrekService
          .updateEmail(nuevoCorreo)
          .then(() => {
            this.correoActual = nuevoCorreo;
            this.nuevoCorreo = '';
            Swal.fire('Success', 'Email updated successfully ✉️', 'success');
          })
          .catch((error) => {
            if (error.code === 'auth/requires-recent-login') {
              Swal.fire(
                'Error',
                'Debes volver a iniciar sesión para cambiar el correo',
                'warning'
              );
            } else {
              Swal.fire('Error', 'No se pudo actualizar el correo', 'error');
            }
            console.error('Error al actualizar el correo:', error);
          });
      }
    }
  }

  selectProfile(url: string, idx: number) {
    this.selectedProfile = idx;
    localStorage.setItem('selectedProfileUrl', url);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const width = window.innerWidth;
    if (width < 768) {
      this.screenSize = 'sm';
    } else if (width < 1280) {
      this.screenSize = 'md';
    } else if (width < 1536) {
      this.screenSize = 'xl';
    } else {
      this.screenSize = '2xl';
    }
  }

  loadProfilePictures() {
    this.codetrekService.getProfilePictures().subscribe((pictures) => {
      this.profilePictures = pictures.map((p) => p.url);
    });
  }

  closePopup(toggle?: HTMLInputElement) {
    this.showPopup = false;

    if (
      this.selectedProfile !== null &&
      this.profilePictures[this.selectedProfile]
    ) {
      const selectedUrl = this.profilePictures[this.selectedProfile];
      const currentUser = this.auth.currentUser;

      if (currentUser) {
        this.codetrekService.updateUserProfileImage(
          currentUser.uid,
          selectedUrl
        );

        this.codetrekService.setProfileImageUrl(selectedUrl);
        localStorage.setItem('profileImageUrl', selectedUrl);
      }
    }

    // Si el toggle está activo, lo desactivamos
    if (toggle && toggle.checked) {
      toggle.checked = false;
    }
  }

  onToggleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    const currentUser = this.auth.currentUser;
    if (currentUser && isChecked) {
      // Imagen por defecto
      const defaultImage = '../assets/profile_icon.webp';

      // Guardar en Firestore
      this.codetrekService.updateUserProfileImage(
        currentUser.uid,
        defaultImage
      );

      // Actualizar globalmente
      this.codetrekService.setProfileImageUrl(defaultImage);

      localStorage.setItem('profileImageUrl', defaultImage);
    }
  }
}
