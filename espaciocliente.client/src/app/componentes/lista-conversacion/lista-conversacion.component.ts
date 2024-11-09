import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IncidenciaComponent } from '../incidencia/incidencia.component';
import { Incidencias } from '../../estado/incidencias';
import { EstadoService } from '../../servicios/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-lista-conversacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, IncidenciaComponent],
  templateUrl: './lista-conversacion.component.html',
  styleUrl: './lista-conversacion.component.css'
})
export class ListaConversacionComponent {
  incidencias: Incidencias;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;

    //this.estadoService.arbol.nodoSeleccionado$.
    //  pipe(takeUntilDestroyed(this.destroyRef)).
    //  subscribe({
    //    next: (seleccionado: TreeNode) => {
    //      //this.incidencias.setNodo(seleccionado.data.Id);
    //    }
    //  });
  }
}
