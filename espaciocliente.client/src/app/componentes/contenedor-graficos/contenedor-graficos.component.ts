import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { EstadoService } from '../../servicios/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InversionData, InversionService } from '../../servicios/inversion.service';
import { TreeNode } from 'primeng/api';
import { FiltroActivo } from '../../estado/filtro';
import { Observable, Subject, switchMap } from 'rxjs';
import { ChartModule } from 'primeng/chart';
import { Grafico } from '../../estado/grafico';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contenedor-graficos',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, SelectButtonModule],
  templateUrl: './contenedor-graficos.component.html',
  styleUrl: './contenedor-graficos.component.css'
})
export class ContenedorGraficosComponent {

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
    this.estadoService.filtro.filtroModificado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro) => {
          this.grafico.setFiltro(filtro);          
        }
      });    
  }
  
}
