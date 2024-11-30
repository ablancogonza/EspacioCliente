import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SeleccioneNodoComponent } from '../../shared/components/seleccione-nodo/seleccione-nodo.component';
import { EstadoService } from '../../shared/estado/estado.service';
import { Grafico } from '../grafico';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';
import { FiltroFechas } from '../../filtro/filtro-fechas';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, SelectButtonModule,
    SeleccioneNodoComponent, CargandoComponent],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css'
})
export class GraficosComponent implements OnInit {

  grafico: Grafico;

  constructor(private estadoService: EstadoService,
    private destroyRef: DestroyRef) {
    this.grafico = estadoService.grafico;
    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado) => {
          this.grafico.setNodo(seleccionado);
        }
      });
    this.estadoService.filtro.filtroFechas$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (fechas: FiltroFechas) => {
          this.grafico.fechasCambiadas(fechas);
        }
      });
  }

  ngOnInit() {
    if (this.grafico.nodoArbolSeleccionado === undefined || this.grafico.nodoArbolSeleccionado.data === undefined) {
      this.grafico.sinNodoSeleccionado();
    }
  }
}
