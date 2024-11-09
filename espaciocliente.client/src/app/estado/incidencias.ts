import { signal } from "@angular/core";
import { Incidencia, IncidenciasService, Mensaje } from "../servicios/incidencias.service";
import { TipoEntradaMensaje } from "../enumerados/tipo-entrada-mensaje";

export class Incidencias {

  idNodo: number | undefined = undefined;
  titulo: string = '';
  visibleNuevaIncidencia: boolean = false;
  procesando = signal<boolean>(false);
  lista = signal<Incidencia[]>([]);
  vista = signal<string>('lista');
  seleccionada: Incidencia | undefined;
  cargandoMensajes = signal<boolean>(false);
  mensajes = signal < EntradaMensaje[]>([]);

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

  nuevo() {
    this.visibleNuevaIncidencia = true;
  }

  aceptaNuevaIncidencia() {
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
    this.cargarMensajes(i.id);
  }

  publicar(texto: string) {
    this.procesando.set(true);
    this.incidenciasService.publicarMensaje(this.seleccionada!.id, texto).subscribe({
      next: (msg) => {
        this.procesando.set(false);
      }
    })
  }

  cargarMensajes(id: number) {
    console.log('cargar mensajes: ', id);
    this.incidenciasService.recuperarMensajes(id).subscribe({
      next: (lista: Mensaje[]) => {
        this.mensajes.set(this.mensajesProcesados(lista));
        //console.log('mensajes: ', lista);
      }
    })
  }

  mensajesProcesados(lista: Mensaje[]): EntradaMensaje[] {
    const res: EntradaMensaje[] = [];
    if (lista.length === 0) return res;
    let fecha = lista[0].fecha;
    console.log('fecha: ', fecha.getFullYear());

    return res;
  }
}

export interface EntradaMensaje {
  tipo: TipoEntradaMensaje,
  fecha: string,
  hora: string,
  texto: string,
  imagen: string
}
