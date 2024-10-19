import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nodo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nodo.component.html',
  styleUrl: './nodo.component.css'
})
export class NodoComponent {
  @Input() tooltip: string = '';
  @Input() tipoNodo: string = '';
  @Input() texto: string = '';
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
}
