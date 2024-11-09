import { signal } from "@angular/core";
import { Incidencia, IncidenciasService } from "../servicios/incidencias.service";

export class Incidencias {

  idNodo: number | undefined = undefined;
  titulo: string = '';
  visibleNuevaIncidencia: boolean = false;
  procesando = signal<boolean>(false);
  lista = signal<Incidencia[]>([]);
  vista = signal<string>('lista');
  seleccionada: Incidencia | undefined;

  constructor(private incidenciasService: IncidenciasService) { }

  setNodo(id: number) {
    this.vista.set('lista');    
    this.idNodo = id;
    this.recuperarIncidencias(id);
    
  }

  recuperarIncidencias(id: number) {
    this.procesando.set(true);    
    this.incidenciasService.recuperarIncidencias(id).subscribe({
      next: (lista: Incidencia[]) => {        
        this.lista.set(lista ?? []);        
        this.procesando.set(false);
      },
      error: (err) => {
        console.log('error recuperar incidencias: ', err);
        this.procesando.set(false);
      }
    })
  }

  //showDialog() {
  //  this.visibleNuevaIncidencia = true;
  //}

  nuevo() {
    this.visibleNuevaIncidencia = true;
  }

  aceptaNuevaIncidencia() {
    debugger;
    this.procesando.set(true);
    this.incidenciasService.crear(this.idNodo!, this.titulo).subscribe({
      next: (incidencia) => {
        console.log('incidencia creada: ', incidencia);
        this.lista.update(prev => [...prev, incidencia]);
        console.log('nueva lista: ', this.lista());
        this.procesando.set(false);
      },
      error: (err) => {
        console.log('error al crear: ', err);
        this.procesando.set(false);
      }
    });

    this.titulo = '';
    this.visibleNuevaIncidencia = false;
  }

  onSeleccionada(i: Incidencia) {
    this.vista.set('detalle');
    this.seleccionada = i;
  }
}
