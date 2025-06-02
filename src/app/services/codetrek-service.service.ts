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
  private profileImageUrlSubject = new BehaviorSubject<string>(
    localStorage.getItem('selectedProfileUrl') || '../assets/profile_icon.webp'
  );
  profileImageUrl$ = this.profileImageUrlSubject.asObservable();
  constructor(private firestore: Firestore, private auth: Auth) {}

  // Crear usuario en Firebase Authentication y guardar datos en Firestore
  async registerUser(
    fullName: string,
    email: string,
    password: string,
    language: string
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;

      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        fullName,
        email,
        createdAt: new Date(),
        profileImageUrl: '../assets/profile_icon.webp',
        language,
      });

      return { success: true, user };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { success: false };
    }
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  getUserProfile(uid: string): Observable<any> {
    const userDocRef = doc(this.firestore, 'users', uid);
    return docData(userDocRef, { idField: 'id' });
  }

  async getFullNameByUID(uid: string): Promise<string | null> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData['fullName'] || null;
      }

      return null;
    } catch (error) {
      console.error('Error obteniendo fullName:', error);
      return null;
    }
  }

  async updateDisplayName(newName: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const uid = user.uid;

    // Buscar documento por campo 'uid'
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('No se encontró el documento del usuario');
    }

    const userDoc = querySnapshot.docs[0];
    const userDocRef = userDoc.ref;

    // Actualizar en Firestore
    await updateDoc(userDocRef, { fullName: newName });
    console.log('Nombre actualizado en Firestore');

    // Actualizar en Firebase Auth
    await updateProfile(user, { displayName: newName });
    console.log('Nombre actualizado en Firebase Auth');
  }

  async updateEmail(newEmail: string): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('No user logged in');
    }

    if (!user.emailVerified) {
      // Si el correo no está verificado, se envía el correo de verificación
      await sendEmailVerification(user);
      throw new Error(
        'Correo electrónico no verificado. Por favor verifica tu correo antes de cambiarlo.'
      );
    }

    try {
      // Actualizar en Firebase Auth
      await updateEmail(user, newEmail);

      // Si también guardas el correo en Firestore
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('El documento del usuario no existe');
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(this.firestore, 'users', userDoc.id);

      // Actualizar el correo en Firestore
      await updateDoc(userDocRef, { email: newEmail });
    } catch (error) {
      console.error('Error al actualizar el correo electrónico:', error);
      throw error;
    }
  }

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

  async getUserProgress(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'progress', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {};
    }
  }

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

      await updateDoc(userDocRef, {
        points: increment(pointsToAdd),
      });

      console.log(`Puntos añadidos: +${pointsToAdd} a usuario ${uid}`);
    } catch (error) {
      console.error('Error al añadir puntos al usuario:', error);
    }
  }

  async getUserPoints(uid: string): Promise<number> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return data['points'] || 0;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error getting user points:', error);
      return 0;
    }
  }

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

      this.setProfileImageUrl(imageUrl); // actualiza también en el observable
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
