import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { HttpErrorResponse } from '@angular/common/http';
import { TreeNode } from 'primeng/api';
import { pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EstadoService } from '../../shared/estado/estado.service';
import { NodoComponent } from '../nodo/nodo.component';
import { Arbol } from '../arbol';
import { FiltroActivo } from '../../filtro/filtro-activo';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, TreeModule, NodoComponent],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent {
  arbol: Arbol;
  loading = false;
  constructor(private estado: EstadoService, private destroyRef: DestroyRef) {
    this.arbol = estado.arbol;
    this.estado.filtro.filtroModificado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe((f: FiltroActivo) => estado.arbol.repintar(f));
    
  };

  toolTipNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return `${ Arbol.desTipoNodo(n.data.IdTipoNodo)}: ${n.label}`;
  }

  tipoNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return Arbol.tipoNodo(n.data.IdTipoNodo);
  }


  
}
