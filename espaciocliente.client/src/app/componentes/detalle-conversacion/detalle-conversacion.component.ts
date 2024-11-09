import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IncidenciaComponent } from '../incidencia/incidencia.component';
import { EstadoService } from '../../servicios/estado.service';
import { Incidencias } from '../../estado/incidencias';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detalle-conversacion',
  standalone: true,
  imports: [CommonModule, ButtonModule, IncidenciaComponent],
  templateUrl: './detalle-conversacion.component.html',
  styleUrl: './detalle-conversacion.component.css'
})
export class DetalleConversacionComponent {
  incidencias: Incidencias;

  constructor(private estadoService: EstadoService) {
    this.incidencias = estadoService.incidencias;    
  }

  volver() {
    this.incidencias.vista.set('lista');
  }
}
