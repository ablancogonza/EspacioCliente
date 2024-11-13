import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CargandoComponent } from '../cargando/cargando.component';

@Component({
  selector: 'app-contenedor',
  standalone: true,
  imports: [CommonModule, CargandoComponent],
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.css'
})
export class ContenedorComponent {
  @Input() cargando: boolean = false;
}
