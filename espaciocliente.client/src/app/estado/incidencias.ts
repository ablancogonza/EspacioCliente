import { Incidencia, IncidenciasService } from "../servicios/incidencias.service";

export class Incidencias {

  idNodo: number | undefined = undefined;
  titulo: string = '';
  visibleNuevaIncidencia: boolean = false;
  procesando = false;
  lista: Incidencia[] = [];

  constructor(private incidenciasService: IncidenciasService) { }

  setNodo(id: number) {
    this.idNodo = id;
  }

  showDialog() {
    this.visibleNuevaIncidencia = true;
  }

  nuevo() {
    this.visibleNuevaIncidencia = true;
  }

  aceptaNuevaIncidencia() {
    this.procesando = true;
    this.incidenciasService.crear(this.idNodo!, this.titulo).subscribe({
      next: (incidencia) => {

      }
    });

    this.titulo = '';
    this.visibleNuevaIncidencia = false;
  }
}
