import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IncidenciaComponent } from '../incidencia/incidencia.component';
import { EstadoService } from '../../servicios/estado.service';
import { Incidencias } from '../../estado/incidencias';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-detalle-conversacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, IncidenciaComponent, MensajeComponent],
  templateUrl: './detalle-conversacion.component.html',
  styleUrl: './detalle-conversacion.component.css'
})
export class DetalleConversacionComponent {
  incidencias: Incidencias;
  texto: string = '';
  constructor(private estadoService: EstadoService) {
    this.incidencias = estadoService.incidencias;    
  }

  volver() {
    this.incidencias.vista.set('lista');
  }

  publicar() {
    this.incidencias.publicar(this.texto);
  }
}
