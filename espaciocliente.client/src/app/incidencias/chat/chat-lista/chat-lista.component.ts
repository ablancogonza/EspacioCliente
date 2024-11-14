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
import { IncidenciaComponent } from '../incidencia/incidencia.component';
import { DetalleConversacionComponent } from '../detalle-conversacion/detalle-conversacion.component';
import { ListaConversacionComponent } from '../lista-conversacion/lista-conversacion.component';
import { filter } from 'rxjs';
import { SeleccioneNodoComponent } from '../seleccione-nodo/seleccione-nodo.component';

@Component({
  selector: 'app-chat-lista',
  standalone: true,
  imports: [CommonModule, ListaConversacionComponent, DetalleConversacionComponent,
    ProcesandoComponent, SeleccioneNodoComponent],
  templateUrl: './chat-lista.component.html',
  styleUrl: './chat-lista.component.css'
})
export class ChatListaComponent {

  incidencias: Incidencias;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;

    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      pipe(filter((v: TreeNode) => v.data)).
      subscribe({
        next: (seleccionado: TreeNode) => {
          if (seleccionado && seleccionado.data) {
            this.incidencias.setNodo(seleccionado.data.Id);
          }
        }
      });
  }
}


@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

}
