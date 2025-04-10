import { Component } from '@angular/core';

@Component({
  selector: 'app-challenges',
  standalone: false,
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.css'
})
export class ChallengesComponent {
  challenges = [
    {
      title: 'Bubble Sort Challenge',
      description: 'Ordena una lista usando bubble sort sin usar métodos predefinidos.',
      solvedBy: 16,
      difficulty: 'Intermediate'
    },
    {
      title: 'Reverse a String',
      description: 'Invierte un string sin utilizar ".reverse()".',
      solvedBy: 42,
      difficulty: 'Easy'
    },
    {
      title: 'Create a Calculator',
      description: 'Haz una calculadora básica usando inputs dinámicos.',
      solvedBy: 8,
      difficulty: 'Advanced'
    }
  ];
}