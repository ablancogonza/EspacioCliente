import { Component, DestroyRef } from '@angular/core';
import { EstadoService } from '../../shared/estado/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { Incidencias } from '../incidencias';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ListaIncidenciasComponent } from '../lista-incidencias/lista-incidencias.component';
import { IncidenciasDetalleComponent } from '../incidencias-detalle/incidencias-detalle.component';
import { SeleccioneNodoComponent } from '../../shared/components/seleccione-nodo/seleccione-nodo.component';
import { ListaMensajesComponent } from '../lista-mensajes/lista-mensajes.component';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, ListaIncidenciasComponent, IncidenciasDetalleComponent,
    CargandoComponent, SeleccioneNodoComponent, ListaMensajesComponent],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent {
  incidencias: Incidencias;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;

    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).    
      subscribe({
        next: (seleccionado: TreeNode) => {         
          this.incidencias.setNodo(seleccionado.data);          
        }
      });
  }
}


