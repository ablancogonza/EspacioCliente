import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from "@angular/google-maps";
import { EstadoService } from '../../servicios/estado.service';
import { Mapa } from '../../estado/mapa';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { ProcesandoComponent } from '../procesando/procesando.component';
import { DetalleVallaComponent } from '../detalle-valla/detalle-valla.component';
import { Valla } from '../../servicios/mapa.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, ProcesandoComponent, DetalleVallaComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
  providers: [GoogleMap]
})
export class MapaComponent {
  //@ViewChild(GoogleMap) map!: GoogleMap;
  //@ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
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

    this.estadoService.filtro.filtroModificado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (filtro) => {
          this.mapa.recuperarVallasFiltro(filtro.inicio, filtro.fin);
        }
      });
  }

  valla?: Valla;

  onVallaClick(marker: MapAdvancedMarker, valla: Valla) {       
    this.valla = valla;
    this.infoWindow.open(marker);
  }
  
}