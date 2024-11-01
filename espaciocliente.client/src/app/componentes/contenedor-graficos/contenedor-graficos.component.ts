import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { EstadoService } from '../../servicios/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InversionMedio, InversionService } from '../../servicios/inversion.service';
import { TreeNode } from 'primeng/api';
import { FiltroActivo } from '../../estado/filtro';
import { Observable, Subject, switchMap } from 'rxjs';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-contenedor-graficos',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './contenedor-graficos.component.html',
  styleUrl: './contenedor-graficos.component.css'
})
export class ContenedorGraficosComponent {

  nodo?: TreeNode;
  filtroActivo?: FiltroActivo;
  data: any;
  options: any;
  peticionRefrescoGrafico$: Subject<FiltroActivo> = new Subject();
  obtenerGrafico$: Observable<InversionMedio[]>;

  constructor(private estadoService: EstadoService,
    private inversionService: InversionService,
    private destroyRef: DestroyRef) {
    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado) => {
          this.nodo = seleccionado;
          this.recalcularGrafico();
        }
      });
    this.estadoService.filtro.filtroModificado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro) => {
          this.filtroActivo = filtro;
          this.recalcularGrafico();
        }
      });

    this.obtenerGrafico$ = this.peticionRefrescoGrafico$.pipe(
      switchMap(filtro => this.inversionService.inversionMedio(filtro))
    );

    this.obtenerGrafico$.subscribe((datos) => {
      console.log('datos grafico medio: ', datos);
      const labels: string[] = datos.map(r => r.Medio);
      const data: number[] = datos.map(r => r.Inversion);
      this.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            //backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            //hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: 'black'
            }
          }
        }
      };
    });
  }

  recalcularGrafico() {
    if (!this.filtroActivo || !this.nodo) return;
    this.peticionRefrescoGrafico$.next({ id: parseInt(this.nodo.key!), inicio: this.filtroActivo.inicio, fin: this.filtroActivo.fin });
  }

}
