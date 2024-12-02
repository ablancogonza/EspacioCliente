import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import { signal } from "@angular/core";
import { Presupuesto } from "../shared/utils/presupuesto";
import { FiltroService } from "./filtro.service";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { KeyValueDto } from "../shared/dtos/key-value-dto";
import { FiltroFechas } from "./filtro-fechas";
import { ElementoFiltro } from "./elemento-filtro";
import { FiltroNodo } from "./filtro-nodo";
import { HttpErrorResponse } from "@angular/common/http";

export class Filtro {
  filtroInicial: FiltroFechas = { inicio: 202401, fin: 202412 };
  elementosFiltro$: BehaviorSubject<ElementoFiltro[]> = new BehaviorSubject<ElementoFiltro[]>([]);
  inicio = signal(Presupuesto.presupuestoToDate(this.filtroInicial.inicio));
  fin = signal(Presupuesto.presupuestoToDate(this.filtroInicial.fin));
  filtroNodo$: BehaviorSubject<FiltroNodo> = new BehaviorSubject<FiltroNodo>({ nodo: undefined });
  filtroFechas$: BehaviorSubject<FiltroFechas>;

  constructor(private filtroService: FiltroService, private mensajesService: MensajesService) {

    this.filtroFechas$ = new BehaviorSubject<FiltroFechas>({
      inicio: Presupuesto.dateToPresupuesto(this.inicio()),
      fin: Presupuesto.dateToPresupuesto(this.fin())
    });    
  }

  init() {
    this.filtroService.elementosFiltro().subscribe({
      next: (elementos) => {
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
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });
  }

  inicioModificado(d: Date) {    
    if (Presupuesto.dateToPresupuesto(d) > Presupuesto.dateToPresupuesto(this.fin())) {
      this.inicio.set(this.fin());
      this.mensajesService.warning('La fecha de inicio no puede ser posterior a la de fin');
    } else {
      this.inicio.set(d);
    }
    this.notificarFechasCambiado();
  }

  finModificado(d: Date) {    
    if (Presupuesto.dateToPresupuesto(d) < Presupuesto.dateToPresupuesto(this.inicio())) {
      this.fin.set(this.inicio());
      this.mensajesService.warning('La fecha de fin no puede ser anterior a la de inicio');
    } else {
      this.fin.set(d);
    }
    this.notificarFechasCambiado();
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
    this.filtroNodo$.next({ nodo: e.seleccionado?.key });
  }

  idBuscador(): number | undefined {
    let i = this.elementosFiltro$.value.length - 1;
    while (i >= 0) {
      if (this.elementosFiltro$.value[i].seleccionado !== undefined) return this.elementosFiltro$.value[i].seleccionado?.key;
      i--;
    }
    return undefined;
  }

  notificarFechasCambiado() {
    const fa: FiltroFechas = {      
      inicio: Presupuesto.dateToPresupuesto(this.inicio()),
      fin: Presupuesto.dateToPresupuesto(this.fin())
    };
    this.filtroFechas$.next(fa);
  }
}



