import { BehaviorSubject } from "rxjs";
import { KeyValueDto } from "../dtos/key-value-dto";
import { FiltroService } from "../servicios/filtro.service";

export class Filtro {

  elementosFiltro$: BehaviorSubject<ElementoFiltro[]> = new BehaviorSubject<ElementoFiltro[]>([]);

  constructor(private filtroService: FiltroService) { }

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
}

export interface ElementoFiltro {
  id: number;
  titulo: string;
  seleccionado: KeyValueDto | undefined;
  coincidentes: KeyValueDto[];
}
