import { Injectable } from '@angular/core';
import { sendEmailVerification } from '@angular/fire/auth';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateEmail,
  updateProfile,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodetrekServiceService {
  // BehaviorSubject para almacenar y emitir la URL de la imagen de perfil seleccionada
  private profileImageUrlSubject = new BehaviorSubject<string>(
    // Inicializa con el valor guardado en localStorage o con una imagen por defecto
    localStorage.getItem('selectedProfileUrl') || '../assets/profile_icon.webp'
  );
  // Observable público para que otros componentes se suscriban a los cambios en la imagen de perfil
  profileImageUrl$ = this.profileImageUrlSubject.asObservable();

  // Establece Firestore y Auth para trabajar con BBDD y autenticación
  constructor(private firestore: Firestore, private auth: Auth) {}

  // Registrar usuario en Auth y guardar datos en Firestore
  async registerUser(
    fullName: string,
    email: string,
    password: string,
    language: string
  ) {
    try {
      // Crea el usuario con email y contraseña en Auth
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;

      // Referencia a la colección 'users' en Firestore
      const usersCollection = collection(this.firestore, 'users');
      // Añade un nuevo documento con los datos del usuario recién creado
      await addDoc(usersCollection, {
        uid: user.uid,
        fullName,
        email,
        createdAt: new Date(),
        profileImageUrl: '../assets/profile_icon.webp', // imagen por defecto
        language,
      });

      return { success: true, user };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { success: false };
    }
  }

  // Método para saber si hay un usuario autenticado actualmente
  isLoggedIn(): boolean {
    return !!this.auth.currentUser; // True si hay usuario, false si no
  }

  // Obtener el perfil de un usuario dado su UID como observable para escuchar cambios en tiempo real
  getUserProfile(uid: string): Observable<any> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return docData(userDocRef, { idField: 'id' });
  }

  // Obtener el nombre completo de un usuario dado su UID
  async getFullNameByUID(uid: string): Promise<string | null> {
    try {
      const usersRef = collection(this.firestore, 'users');
      // Consulta para buscar el documento donde uid coincida
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData['fullName'] || null; // Devuelve el nombre completo del usuario
      }

      return null; // No encontró usuario
    } catch (error) {
      console.error('Error obteniendo fullName:', error);
      return null;
    }
  }

  // Actualiza el nombre que se muestra del usuario tanto en Firestore como en Firebase Auth
  async updateDisplayName(newName: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const uid = user.uid;

    // Buscar documento en Firestore con uid igual al actual
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('No se encontró el documento del usuario');
    }

    const userDoc = querySnapshot.docs[0];
    const userDocRef = userDoc.ref;

    // Actualiza el campo fullName en Firestore
    await updateDoc(userDocRef, { fullName: newName });
    console.log('Nombre actualizado en Firestore');

    // Actualiza el displayName en Firebase Authentication
    await updateProfile(user, { displayName: newName });
    console.log('Nombre actualizado en Firebase Auth');
  }

  // Cambia el correo electrónico del usuario
  async updateEmail(newEmail: string): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('No user logged in');
    }

    if (!user.emailVerified) {
      // Si el correo no está verificado
      await sendEmailVerification(user);
      throw new Error(
        'Correo electrónico no verificado. Por favor verifica tu correo antes de cambiarlo.'
      );
    }

    try {
      // Actualiza el email en Firebase Authentication
      await updateEmail(user, newEmail);

      // Actualiza también el email en Firestore
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('El documento del usuario no existe');
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(this.firestore, 'users', userDoc.id);

      await updateDoc(userDocRef, { email: newEmail });
    } catch (error) {
      console.error('Error al actualizar el correo electrónico:', error);
      throw error;
    }
  }

  // Obtener el idioma preferido del usuario dado su UID
  async getLanguageByUID(uid: string): Promise<string | null> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData['language'] || null;
      }

      return null;
    } catch (error) {
      console.error('Error obteniendo language:', error);
      return null;
    }
  }

  // Actualiza el progreso de un curso para un usuario
  async updateCourseProgress(
    uid: string,
    courseName: string,
    level: number
  ): Promise<void> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('No se encontró el documento del usuario');
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(this.firestore, 'users', userDoc.id);

      // Crea la clave dinámica para progreso dentro del documento
      const progressKey = `progress.${courseName}`;
      const progressValue = `${level}/5`;

      await updateDoc(userDocRef, {
        [progressKey]: progressValue,
      });

      console.log(`Progreso actualizado: ${courseName} → ${progressValue}`);
    } catch (error) {
      console.error('Error al actualizar el progreso del curso:', error);
    }
  }

  // Obtener el progreso del usuario
  async getUserProgress(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'progress', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {}; // Si no existe progreso, devulve objeto vacío
    }
  }

  // Añadir puntos al usuario
  async addPointsToUser(uid: string, pointsToAdd: number): Promise<void> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('No se encontró el documento del usuario');
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(this.firestore, 'users', userDoc.id);

      // Aumenta el campo 'points' en Firestore
      await updateDoc(userDocRef, {
        points: increment(pointsToAdd),
      });

      console.log(`Puntos añadidos: +${pointsToAdd} a usuario ${uid}`);
    } catch (error) {
      console.error('Error al añadir puntos al usuario:', error);
    }
  }

  // Obtener puntos del usuario
  async getUserPoints(
    uid: string,
    onChangeCallback?: (points: number) => void
  ): Promise<{ points: number; unsubscribe?: () => void }> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocSnapshot = querySnapshot.docs[0];
        const userData = userDocSnapshot.data();
        const points = userData['points'] ?? 0;

        if (onChangeCallback) {
          const userDocRef = doc(this.firestore, 'users', userDocSnapshot.id);
          const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              onChangeCallback(data['points'] ?? 0);
            } else {
              onChangeCallback(0);
            }
          });

          return { points, unsubscribe };
        }

        return { points };
      }

      return { points: 0 };
    } catch (error) {
      console.error('Error obteniendo los puntos:', error);
      return { points: 0 };
    }
  }

  // Actualizar imagen de perfil
  async updateUserProfileImage(uid: string, imageUrl: string) {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (document) => {
        const userDocRef = doc(this.firestore, 'users', document.id);
        await updateDoc(userDocRef, {
          profileImageUrl: imageUrl,
        });
      });

      this.setProfileImageUrl(imageUrl);
    } catch (error) {
      console.error('Error actualizando imagen de perfil:', error);
    }
  }

  getProfilePictures(): Observable<{ url: string }[]> {
    const picturesRef = collection(this.firestore, 'profile_pictures');
    return collectionData(picturesRef, { idField: 'id' }) as Observable<
      { url: string }[]
    >;
  }
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

  setProfileImageUrl(url: string) {
    localStorage.setItem('selectedProfileUrl', url);
    this.profileImageUrlSubject.next(url);
  }
}
