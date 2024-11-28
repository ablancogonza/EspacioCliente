import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, ViewChild } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EstadoService } from '../../shared/estado/estado.service';
import { Arbol } from '../arbol';
import { Arbol as UtilsArbol } from '../../shared/utils/arbol';
import { FiltroNodo } from '../../filtro/filtro-nodo';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, TreeModule],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent implements AfterViewInit {
  @ViewChild('contenedor') contenedor!: ElementRef;
  arbol: Arbol;
  loading = false;
  constructor(private estado: EstadoService, private destroyRef: DestroyRef) {
    this.arbol = estado.arbol;
    this.estado.filtro.filtroNodo$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe((f: FiltroNodo) => estado.arbol.setNodo(f.nodo));
    
  };

  ngAfterViewInit() {
    this.contenedor.nativeElement.scrollTop = `${this.arbol.scrollArbol()}`;
    const scrollStream = fromEvent(this.contenedor.nativeElement, 'scroll');
    console.log('afterInit(): ', scrollStream);

    scrollStream.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (t: any) => {
        console.log('scroll: ', t.srcElement.scrollTop);
        this.arbol.scrollArbol.set(t.srcElement.scrollTop);
      }
    });    
  }


  toolTipNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return `${ UtilsArbol.desTipoNodo(n.data.IdTipoNodo)}: ${n.label}`;
  }

  tipoNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return UtilsArbol.tipoNodo(n.data.IdTipoNodo);
  }


  
}
