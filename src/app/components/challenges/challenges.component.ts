import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { CodetrekServiceService } from '../../services/codetrek-service.service';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { js as beautifyJs } from 'js-beautify';


@Component({
  selector: 'app-challenges',
  standalone: false,
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  showPopup = false;
  selectedDifficulty: string = '';


  newChallenge = {
    title: '',
    description: '',
    difficulty: 'Easy',
    language: 'javascript', 
    options: ['', '', ''],
    correctIndex: 0,
  };

  challengesFromDB: any[] = [];
  profileImageUrl: string = '';
  selectedChallenge: any = null; 
  userAnswers: { [challengeId: string]: number } = {};

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private codetrekService: CodetrekServiceService
  ) {}

  ngOnInit(): void {
    this.loadChallenges();
    this.codetrekService.profileImageUrl$.subscribe((url) => {
      this.profileImageUrl = url;
    });
  }

  togglePopup() {
    const isLoggedIn = this.codetrekService.isLoggedIn();

    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes estar registrado para añadir un nuevo desafío',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    this.showPopup = !this.showPopup;
    if (!this.showPopup) {
      this.resetNewChallenge();
    }
  }

  resetNewChallenge() {
    this.newChallenge = {
      title: '',
      description: '',
      difficulty: 'Easy',
      language: 'javascript', 
      options: ['', '', ''],
      correctIndex: 0,
    };
  }

  async saveChallenge() {
    const { title, description, difficulty, language, options, correctIndex } = this.newChallenge;

    const isValid =
      title?.trim() &&
      description?.trim() &&
      difficulty &&
      language &&
      options.length === 3 &&
      options.every(opt => opt?.trim()) &&
      correctIndex !== null && correctIndex !== undefined;
  
    if (!isValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos y asegúrate de que hay 3 opciones válidas.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Desafío guardado',
      text: '¡Tu desafío ha sido creado correctamente!',
      confirmButtonColor: '#3085d6',
    });  
    const user = this.auth.currentUser;
    if (!user) return;

    const challengesRef = collection(this.firestore, 'desafios');
    const challengeData = {
      ...this.newChallenge,
      solvedBy: 0,
      uid: user.uid,
      profileImageUrl: this.profileImageUrl,
      createdAt: new Date(),
    };

    await addDoc(challengesRef, challengeData);
    this.togglePopup();
    this.loadChallenges();
  }

  loadChallenges() {
    const desafiosRef = collection(this.firestore, 'desafios');
    collectionData(desafiosRef, { idField: 'id' }).subscribe((data) => {
      this.challengesFromDB = data;
    });
  }

  openChallengePopup(challenge: any) {
    this.selectedChallenge = challenge;
  }

  closeChallengePopup() {
    this.selectedChallenge = null;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  

  updateOption(index: number, value: string): void {
    this.newChallenge.options[index] = value;
  }
  
  
  

  async validateAnswer(challenge: any, selectedOptionIndex: number) {
    this.userAnswers[challenge.id] = selectedOptionIndex;
  
    if (selectedOptionIndex === challenge.correctIndex) {
      const user = this.auth.currentUser;
      if (!user) return;
  
      const solvedRef = doc(this.firestore, `desafios_resueltos/${user.uid}_${challenge.id}`);
      const solvedSnap = await getDoc(solvedRef);
  
      if (!solvedSnap.exists()) {
        // Guardamos el registro de que el usuario lo resolvió
        await setDoc(solvedRef, {
          uid: user.uid,
          challengeId: challenge.id,
          timestamp: new Date()
        });
  
        // Actualizamos el contador en el desafío
        const desafioRef = doc(this.firestore, `desafios/${challenge.id}`);
        await updateDoc(desafioRef, {
          solvedBy: increment(1)
        });
      }
    }
  }

  formatCode(code: string): string {
    return beautifyJs(code, {
      indent_size: 2,
      space_in_empty_paren: true
    });
  }
  
}
