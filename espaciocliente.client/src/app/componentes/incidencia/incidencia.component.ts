import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Incidencia } from '../../servicios/incidencias.service';

@Component({
  selector: 'app-incidencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css'
})
export class IncidenciaComponent {
  @Input() incidencia?: Incidencia;
  @Output() seleccionada: EventEmitter<Incidencia> = new EventEmitter();

  click() {
    this.seleccionada.emit(this.incidencia);
  }
}
