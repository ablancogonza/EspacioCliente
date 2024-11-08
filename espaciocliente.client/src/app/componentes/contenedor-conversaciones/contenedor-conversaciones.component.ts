import { Component } from '@angular/core';
import { EstadoService } from '../../servicios/estado.service';
import { Incidencias } from '../../estado/incidencias';

@Component({
  selector: 'app-contenedor-conversaciones',
  standalone: true,
  imports: [],
  templateUrl: './contenedor-conversaciones.component.html',
  styleUrl: './contenedor-conversaciones.component.css'
})
export class ContenedorConversacionesComponent {

  incidencias: Incidencias;
  constructor(private estadoService: EstadoService) {
    this.incidencias = estadoService.incidencias;
  }


}
