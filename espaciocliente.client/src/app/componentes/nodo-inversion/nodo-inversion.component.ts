import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BuscadorFiltroComponent } from '../filtro/buscador-filtro/buscador-filtro.component';
import { FiltroComponent } from '../filtro/filtro.component';
import { EstadoService } from '../../servicios/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-nodo-inversion',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarModule, FiltroComponent],
  templateUrl: './nodo-inversion.component.html',
  styleUrl: './nodo-inversion.component.css'
})
export class NodoInversionComponent {
  filtroVisible: boolean = false;
  nodo$: Observable<TreeNode>;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
  this.nodo$ = this.estadoService.arbol.nodoSeleccionado$;
      //.pipe(takeUntilDestroyed(this.destroyRef))
      //.subscribe({
      //  next: (seleccionado) => {

      //  }
      //})
  }
}
