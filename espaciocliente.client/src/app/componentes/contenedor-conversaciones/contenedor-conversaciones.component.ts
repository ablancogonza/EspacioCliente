import { Component } from '@angular/core';
import { EstadoService } from '../../servicios/estado.service';
import { Incidencias } from '../../estado/incidencias';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contenedor-conversaciones',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, InputTextModule],
  templateUrl: './contenedor-conversaciones.component.html',
  styleUrl: './contenedor-conversaciones.component.css'
})
export class ContenedorConversacionesComponent {

  incidencias: Incidencias;
  visibleNuevaIncidencia: boolean = false;

  showDialog() {
    this.visibleNuevaIncidencia = true;
  }
  constructor(private estadoService: EstadoService) {
    this.incidencias = estadoService.incidencias;
  }

  nuevo() {
    this.visibleNuevaIncidencia = true;
  }
}
