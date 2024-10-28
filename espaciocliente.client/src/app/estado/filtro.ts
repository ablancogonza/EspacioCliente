import { BehaviorSubject } from "rxjs";
import { KeyValueDto } from "../dtos/key-value-dto";
import { FiltroService } from "../servicios/filtro.service";
import { initZone } from "zone.js/lib/zone-impl";

export class Filtro {

  elementosFiltro$: BehaviorSubject<ElementoFiltro[]> = new BehaviorSubject<ElementoFiltro[]>([]);
  inicio: Date;
  fin: Date;

  constructor(private filtroService: FiltroService) {
    this.inicio = new Date(2023, 0, 1);
    this.fin = new Date(2023, 11, 31);
  }

  init() {
    this.filtroService.elementosFiltro().subscribe(elementos => {
      const elems: ElementoFiltro[] = [];      
      elementos?.map(e => {
        const elem: ElementoFiltro = {
          id: e.Id,
          titulo: e.TipoNodo,
          seleccionado: undefined,
          coincidentes: []
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
}

export interface ElementoFiltro {
  id: number;
  titulo: string;
  seleccionado: KeyValueDto | undefined;
  coincidentes: KeyValueDto[];
}
