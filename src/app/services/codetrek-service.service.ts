import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CodetrekServiceService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  // Crear usuario en Firebase Authentication y guardar datos en Firestore
  async registerUser(fullName: string, email: string, password: string) {
    try {
      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Guardar usuario en Firestore
      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        fullName,
        email,
        createdAt: new Date()
      });

      return { success: true, user };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { success: false};
    }
  }
}