import { signal } from "@angular/core";
import { MapaService, Valla } from "../servicios/mapa.service";
import { BehaviorSubject } from "rxjs";

export class Mapa {

  vallas = signal<Valla[]>([]);
  options = signal<google.maps.MapOptions>({});
  markers = signal<any[]>([]);
  limites$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  idNodo: number | undefined = undefined;
  inicio: number | undefined = undefined;
  fin: number | undefined = undefined
  cargando = true;
  constructor(private mapaService: MapaService) {
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
          this.vallas.set(vallas);
          const marcas: any[] = [];
          vallas.forEach(valla => {
            marcas.push({ position: { lat: parseFloat(valla.lat), lng: parseFloat(valla.lon) } });
          });          
          this.markers.set(marcas);
          this.limites$.next(this.getBounds(this.markers()));
          this.cargando = false;
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
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }
  
}
