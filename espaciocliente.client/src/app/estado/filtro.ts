import { BehaviorSubject } from "rxjs";
import { KeyValueDto } from "../dtos/key-value-dto";
import { FiltroService } from "../servicios/filtro.service";
import { initZone } from "zone.js/lib/zone-impl";

export class Filtro {

  elementosFiltro$: BehaviorSubject<ElementoFiltro[]> = new BehaviorSubject<ElementoFiltro[]>([]);
  inicio: Date;
  fin: Date;
  filtroModificado$: BehaviorSubject<FiltroActivo>;

  constructor(private filtroService: FiltroService) {
    this.inicio = new Date(2023, 0, 1);
    this.fin = new Date(2023, 11, 31);
    this.filtroModificado$ = new BehaviorSubject<FiltroActivo>({
      inicio: this.inicio.getFullYear() * 100 + this.inicio.getMonth() + 1,
      fin: this.fin.getFullYear() * 100 + this.fin.getMonth() + 1,
    })
  }

  init() {
    this.filtroService.elementosFiltro().subscribe(elementos => {
      const elems: ElementoFiltro[] = [];      
      elementos?.map(e => {
        const elem: ElementoFiltro = {
          id: e.Id,
          titulo: e.TipoNodo,
          seleccionado: undefined,
          coincidentes: [],
          activo: true
        };
        elems.push(elem);
      });      
      this.elementosFiltro$.next(elems);
    });
  }

  inicioModificado(d: Date) {
    alert(d);
  }

  finModificado(d: Date) {
    alert(d);
  }

  buscadorModificado(e: ElementoFiltro) {
    console.log('En filtro buscador Modificado: ', e);
  }

  desactivaSuperiores(n: number) {
    this.elementosFiltro$.value?.forEach(e => {
      if (e.id < n) e.activo = false;
    });
    this.notificaFiltroActivo(this.elementosFiltro$.value[n]);    
  }

  notificaFiltroActivo(e: ElementoFiltro) {
    const fa: FiltroActivo = {
      id: e ? e.id : undefined,
      inicio: this.dateToPresupuesto(this.inicio),
      fin: this.dateToPresupuesto(this.fin)
    };
    this.filtroModificado$.next(fa);
  }

  reactivaSuperiores(n: number) {
    for (let i = n - 1; i >= 0; i--) {
      this.elementosFiltro$.value[i].activo = true;
      if (this.elementosFiltro$.value[i].seleccionado !== undefined) {
        break;
      }
    }    
  }

  dateToPresupuesto(d: Date): number {
    return d.getFullYear() * 100 + d.getMonth() + 1;
  }
}

export interface ElementoFiltro {
  id: number;
  titulo: string;
  seleccionado: KeyValueDto | undefined;
  coincidentes: KeyValueDto[];
  activo: boolean;
}

export interface FiltroActivo {
  id?: number;
  inicio: number;
  fin: number;
}
