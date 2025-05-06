import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-desafio',
  standalone: false,
  templateUrl: './desafio.component.html',
  styleUrls: ['./desafio.component.css']
})
export class DesafioComponent {
  showModal = false;
  @Input() title!: string;
  @Input() description!: string;
  @Input() solvedBy!: number;
  @Input() difficulty!: string;
}
