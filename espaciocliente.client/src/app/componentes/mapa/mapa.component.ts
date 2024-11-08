import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from "@angular/google-maps";
import { EstadoService } from '../../servicios/estado.service';
import { Mapa } from '../../estado/mapa';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { ProcesandoComponent } from '../procesando/procesando.component';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, ProcesandoComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  mapa: Mapa;  
  
  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.mapa = this.estadoService.mapa;

    this.mapa.limites$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe((limites) => {
        if (!limites || !this.map || limites.south === undefined) return;        
        setTimeout(() => {
          this.map?.googleMap?.fitBounds(limites);
        }, 100);
        
      });


    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado: TreeNode) => {          
          this.mapa.recuperarVallasNodo(seleccionado.data.Id);
      }
      });

    this.estadoService.filtro.filtroModificado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro) => {
          this.mapa.recuperarVallasFiltro(filtro.inicio, filtro.fin);
        }
      });
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit()');
  }

  
}
