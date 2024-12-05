import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EstadoService } from '../../estado/estado.service';
import { Incidencias } from '../../../incidencias/incidencias';
import { IncidenciasPendientes } from '../../dtos/incidencias-pendientes';
import { TreeNode } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lista-campanias',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './lista-campanias.component.html',
  styleUrl: './lista-campanias.component.css'
})
export class ListaCampaniasComponent {

  incidencias: Incidencias;
  nodo: TreeNode | undefined;
  constructor(public ref: DynamicDialogRef, private estadoService: EstadoService) {
    this.incidencias = estadoService.incidencias;
    this.nodo = estadoService.arbol.nodoSeleccionado$.value;
    console.log('nodo: ', this.nodo);
  }

  seleccionado(c: IncidenciasPendientes): void {    
    this.ref.close(c.Id);
  }

  seleccionadoNodoActivo(): void {
    this.ref.close(this.nodo?.key);
  }

  aniadirNodo(): boolean {   
    if (!this.nodo || !this.nodo.key) return false;
    return this.incidencias.noLeidos$.value.filter(e => e.Id.toString() === this.nodo?.key).length === 0;    
  }
}
