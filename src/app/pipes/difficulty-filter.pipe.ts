import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyFilter',
  standalone: false
})
export class DifficultyFilterPipe implements PipeTransform {
  transform(challenges: any[], selectedDifficulty: string): any[] {
    if (!selectedDifficulty) return challenges;
    return challenges.filter(ch => ch.difficulty === selectedDifficulty);
  }
}