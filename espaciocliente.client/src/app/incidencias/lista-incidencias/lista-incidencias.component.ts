import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IncidenciaComponent } from '../incidencias-detalle/incidencias-detalle.component';
import { Incidencias } from '../../estado/incidencias';
import { EstadoService } from '../../servicios/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-lista-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, IncidenciaComponent],
  templateUrl: './lista-incidencias.component.html',
  styleUrl: './lista-incidencias.component.css'
})
export class ListaIncidenciasComponent {

  incidencias: Incidencias;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;    
  }
}
