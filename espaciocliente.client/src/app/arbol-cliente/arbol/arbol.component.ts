import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EstadoService } from '../../shared/estado/estado.service';
import { FiltroActivo } from '../../filtro/filtro-activo';
import { Arbol } from '../arbol';
import { Arbol as UtilsArbol } from '../../shared/utils/arbol';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, TreeModule],
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
    return `${ UtilsArbol.desTipoNodo(n.data.IdTipoNodo)}: ${n.label}`;
  }

  tipoNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return UtilsArbol.tipoNodo(n.data.IdTipoNodo);
  }


  
}
