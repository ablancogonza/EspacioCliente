import { CommonModule } from '@angular/common';
import { Component, DestroyRef, LOCALE_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BuscadorFiltroComponent } from '../filtro/buscador-filtro/buscador-filtro.component';
import { FiltroComponent } from '../filtro/filtro.component';
import { EstadoService } from '../../servicios/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { FiltroActivo } from '../../estado/filtro';
import { InversionService } from '../../servicios/inversion.service';

@Component({
  selector: 'app-nodo-inversion',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarModule, FiltroComponent],
  templateUrl: './nodo-inversion.component.html',
  styleUrl: './nodo-inversion.component.css',
  providers: [{ provide: LOCALE_ID, useValue: "es-ES" }]
})
export class NodoInversionComponent {
  filtroVisible: boolean = false;
  nodo?: TreeNode;
  filtroActivo?: FiltroActivo;
  peticionRefrescoInversion$: Subject<FiltroActivo> = new Subject();
  obtenerInversion$: Observable<number>;

  constructor(private estadoService: EstadoService,
    private inversionService: InversionService,
    private destroyRef: DestroyRef) {
    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado) => {
          this.nodo = seleccionado;
          this.recalculaInversion();
        }
      });
    this.estadoService.filtro.filtroModificado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro) => {
          this.filtroActivo = filtro;
          this.recalculaInversion();
        }
      });
    this.obtenerInversion$ = this.peticionRefrescoInversion$.pipe(
      switchMap(filtro => this.inversionService.inversion(filtro))
    );    
  }

  recalculaInversion() {
    
    if (!this.filtroActivo || !this.nodo) return;
    this.peticionRefrescoInversion$.next({ id: parseInt(this.nodo.key!), inicio: this.filtroActivo.inicio, fin: this.filtroActivo.fin });    
  }

  eliminar() {
    this.estadoService.arbol.eliminar();
  }
}
