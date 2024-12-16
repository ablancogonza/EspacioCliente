import { signal } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { VallaExt } from "../shared/utils/valla";
import { Valla } from "./valla";
import { MapaService } from "./mapa.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MensajesService } from "../shared/servicios/mensajes.service";

export class Mapa {

  vallas = signal<Valla[]>([]);
  options = signal<google.maps.MapOptions>({});
  markers = signal<Valla[]>([]);
  limites$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  idNodo: number | undefined = undefined;
  inicio: number | undefined = undefined;
  fin: number | undefined = undefined
  valla?: Valla;
  cargando = false;
  constructor(private mapaService: MapaService, private mensajesService: MensajesService) {
    this.options.set({
      mapId: "DEMO_MAP_ID",
      center: { lat: 36.675198, lng: -6.246548 },
      zoom: 6,
    });
  }
 
  recuperarVallas(idNodo: number, inicio: number, fin: number) {
    this.cargando = true;
    setTimeout(() => {
      this.mapaService.vallas(idNodo, inicio, fin).subscribe({
        next: (vallas) => {
          if (!vallas) vallas = [];         
          vallas.forEach(valla => {
            valla.pos = VallaExt.position(valla)            
          });          
          this.markers.set(vallas);
          this.limites$.next(this.getBounds(this.markers()));
          this.cargando = false;
        },
        error: (err: HttpErrorResponse) => {
          this.mensajesService.errorHttp(err);
        }
      });
    });    
  }

  recuperarVallasFiltro(inicio: number, fin: number) {
    this.inicio = inicio;
    this.fin = fin;
    if (this.idNodo) {
      this.recuperarVallas(this.idNodo, inicio, fin);
    };
  }

  recuperarVallasNodo(id: number) {
    this.idNodo = id;
    if (this.inicio && this.fin) {
      this.recuperarVallas(id, this.inicio, this.fin);
    };
  }
  
  getBounds(markers: any[]) {
    let north;
    let south;
    let east;
    let west;

    if (!markers || markers.length === 0) return {
      south: undefined,
      north: undefined,
      east: undefined,
      west: undefined
    };

    for (const marker of markers) {     
      north = north !== undefined ? Math.max(north, marker.pos.lat) : marker.pos.lat;
      south = south !== undefined ? Math.min(south, marker.pos.lat) : marker.pos.lat;
      east = east !== undefined ? Math.max(east, marker.pos.lng) : marker.pos.lng;
      west = west !== undefined ? Math.min(west, marker.pos.lng) : marker.pos.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }
  
}
