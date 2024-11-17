import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargando.component.html',
  styleUrl: './cargando.component.css'
})
export class CargandoComponent {
  @Input() pequenio: boolean = false;
}
