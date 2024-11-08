import { Component, DestroyRef } from '@angular/core';
import { EstadoService } from '../../servicios/estado.service';
import { Incidencias } from '../../estado/incidencias';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProcesandoComponent } from '../procesando/procesando.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-contenedor-conversaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, ProcesandoComponent],
  templateUrl: './contenedor-conversaciones.component.html',
  styleUrl: './contenedor-conversaciones.component.css'
})
export class ContenedorConversacionesComponent {

  incidencias: Incidencias;
  
 

  
  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;

    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado: TreeNode) => {
          this.incidencias.setNodo(seleccionado.data.Id);
        }
      });
  }

  
}
