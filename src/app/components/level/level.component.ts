import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-level',
  standalone: false,
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent {
  courseTitle: string = '';
  levels: number[] = [];

  // Objeto que contiene la cantidad de niveles por cada curso
  courseLevels: { [key: string]: number } = {
    Python: 8,
    JavaScript: 10,
    Java: 12,
    // Agrega más cursos aquí según sea necesario
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.courseTitle = this.route.snapshot.paramMap.get('title') || 'Unknown Course';
    // Obtener el número de niveles para el curso seleccionado
    this.levels = Array.from({ length: this.courseLevels[this.courseTitle] || 0 }, (_, i) => i + 1);
  }

  goToLevel(level: number) {
    this.router.navigate([`/course/${this.courseTitle}/level/${level}`]);
  }

  goBack() {
    this.router.navigate(['/course', this.courseTitle]);
  }
}
