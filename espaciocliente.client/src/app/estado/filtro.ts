import { BehaviorSubject } from "rxjs";
import { KeyValueDto } from "../dtos/key-value-dto";
import { FiltroService } from "../servicios/filtro.service";
import { initZone } from "zone.js/lib/zone-impl";
import { MensajesService } from "../servicios/mensajes.service";
import { signal } from "@angular/core";

export class Filtro {
  filtroInicial: FiltroActivo = { inicio: 202001, fin: 202312 };
  elementosFiltro$: BehaviorSubject<ElementoFiltro[]> = new BehaviorSubject<ElementoFiltro[]>([]);
  inicio = signal(this.presupuestoToDate(this.filtroInicial.inicio));
  fin = signal(this.presupuestoToDate(this.filtroInicial.fin));  
  filtroModificado$: BehaviorSubject<FiltroActivo>;

  constructor(private filtroService: FiltroService, private mensajeService: MensajesService) {

    this.filtroModificado$ = new BehaviorSubject<FiltroActivo>({
      inicio: this.dateToPresupuesto(this.inicio()),
      fin: this.dateToPresupuesto(this.fin())
    });    
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
    if (this.dateToPresupuesto(d) > this.dateToPresupuesto(this.fin())) {
      this.inicio.set(this.fin());
      this.mensajeService.warning('La fecha de inicio no puede ser posterior a la de fin');
    } else {
      this.inicio.set(d);
    }
    this.notificarFiltroCambiado();
  }

  finModificado(d: Date) {    
    if (this.dateToPresupuesto(d) < this.dateToPresupuesto(this.inicio())) {
      this.fin.set(this.inicio());
      this.mensajeService.warning('La fecha de fin no puede ser anterior a la de inicio');
    } else {
      this.fin.set(d);
    }
    this.notificarFiltroCambiado();
  }

  buscadorModificado(e: ElementoFiltro) {    
    if (e.seleccionado !== undefined) {
      const nuevo: ElementoFiltro[] = this.elementosFiltro$.value.map(f => {
        if (f.id > e.id) return f;
        if (f.id === e.id) return e;
        return { ...f, activo: false };      
      });
      this.elementosFiltro$.next(nuevo);
    } else {
      let existeFiltro = false;      
      const nuevo: ElementoFiltro[] = [];      
      for (let i = this.elementosFiltro$.value.length - 1; i >= 0; i--) {          
        if (this.elementosFiltro$.value[i].id > e.id) {
          nuevo.push({ ...this.elementosFiltro$.value[i], coincidentes: [] });
        } else if (this.elementosFiltro$.value[i].id === e.id) {
          nuevo.push({ ...e, activo: true, coincidentes: [] });
        } else {            
          nuevo.push({ ...this.elementosFiltro$.value[i], activo: !existeFiltro, coincidentes: [] });
          if (i < e.id && this.elementosFiltro$.value[i].seleccionado !== undefined) existeFiltro = true;
        }
      }      
      nuevo.reverse();
      this.elementosFiltro$.next(nuevo);
    }
    this.notificarFiltroCambiado();
  }

  idBuscador(): number | undefined {
    let i = this.elementosFiltro$.value.length - 1;
    while (i >= 0) {
      if (this.elementosFiltro$.value[i].seleccionado !== undefined) return this.elementosFiltro$.value[i].seleccionado?.key;
      i--;
    }
    return undefined;
  }

  notificarFiltroCambiado() {
    const fa: FiltroActivo = {
      id: this.idBuscador(),
      inicio: this.dateToPresupuesto(this.inicio()),
      fin: this.dateToPresupuesto(this.fin())
    };
    this.filtroModificado$.next(fa);
  }
 
  dateToPresupuesto(d: Date): number {
    return d.getFullYear() * 100 + d.getMonth() + 1;
  }

  presupuestoToDate(n: number): Date {
    return new Date(Math.round(n / 100), (n % 100) - 1, 1);
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
