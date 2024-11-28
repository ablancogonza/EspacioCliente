import { CommonModule } from '@angular/common';
import { Component, DestroyRef, LOCALE_ID, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BuscadorFiltroComponent } from '../../../filtro/buscador-filtro/buscador-filtro.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { InversionService } from '../../servicios/inversion.service';
import { Presupuesto } from '../../utils/presupuesto';
import { Fecha } from '../../utils/fecha';
import { FiltroComponent } from '../../../filtro/filtro/filtro.component';
import { EstadoService } from '../../estado/estado.service';
import { FiltroFechas } from '../../../filtro/filtro-fechas';
import { Arbol } from '../../utils/arbol';


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
  filtroFechas?: FiltroFechas; 
  rangoFechas: string = '';
  inversion: number | undefined | null = null;
  
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
    this.estadoService.filtro.filtroFechas$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro) => {
          this.filtroFechas = filtro;
          this.rangoFechas = `${Fecha.mesAnio(Presupuesto.presupuestoToDate(filtro.inicio))} - ${Fecha.mesAnio(Presupuesto.presupuestoToDate(filtro.fin))}`;
          this.recalculaInversion();
        }
      });

  }

  recalculaInversion() {    
    if (!this.filtroFechas || !this.nodo || !this.nodo?.key) return;
    this.inversion = undefined;    
    setTimeout(() => {
      this.inversionService.inversion({ id: parseInt(this.nodo?.key!), inicio: this.filtroFechas!.inicio, fin: this.filtroFechas!.fin }).
        subscribe((inv: number) => {
          this.inversion = inv;          
        });
    });   
  }

  eliminar() {
    this.estadoService.arbol.eliminar();
  }

  tipoNodo(n?: TreeNode): string {
    if (!n?.data || !n?.data.IdTipoNodo) return '';
    return Arbol.tipoNodo(n.data.IdTipoNodo);
  }
}
