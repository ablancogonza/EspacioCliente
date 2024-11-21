import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { Incidencias } from '../incidencias';
import { EstadoService } from '../../shared/estado/estado.service';
import { IncidenciasDetalleComponent } from '../incidencias-detalle/incidencias-detalle.component';

@Component({
  selector: 'app-lista-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, IncidenciasDetalleComponent],
  templateUrl: './lista-incidencias.component.html',
  styleUrl: './lista-incidencias.component.css'
})
export class ListaIncidenciasComponent {

  incidencias: Incidencias;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;

    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado) => {
          if (seleccionado) this.incidencias.setNodo(seleccionado.data.Id);
        }
      });
  }
}
