import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from "@angular/google-maps";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { DetalleVallaComponent } from '../detalle-valla/detalle-valla.component';
import { EstadoService } from '../../shared/estado/estado.service';
import { Mapa } from '../mapa';
import { Valla } from '../valla';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';
import { FiltroFechas } from '../../filtro/filtro-fechas';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, CargandoComponent, DetalleVallaComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
  providers: [GoogleMap]
})
export class MapaComponent {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
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

    this.estadoService.filtro.filtroFechas$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro: FiltroFechas) => {
          this.mapa.recuperarVallasFiltro(filtro.inicio, filtro.fin);
        }
      });
  }

  onVallaClick(marker: MapAdvancedMarker, valla: Valla) {       
    this.mapa.valla = valla;
    this.infoWindow.open(marker);
  }
  
}
