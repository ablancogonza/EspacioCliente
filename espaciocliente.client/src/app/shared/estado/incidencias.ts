import { signal } from "@angular/core";
import { Incidencia, IncidenciasService, Mensaje } from "../servicios/incidencias.service";
import { TipoEntradaMensaje } from "../enumerados/tipo-entrada-mensaje";
import { Fecha } from "../shared/utils/fecha";
import { Subject } from "rxjs";

export class Incidencias {
 
  idNodo: number | undefined = undefined;
  titulo: string = '';
  visibleNuevaIncidencia: boolean = false;
  procesando = signal<boolean>(false);
  lista = signal<Incidencia[]>([]);
  vista = signal<string>('lista');
  seleccionada: Incidencia | undefined;
  cargandoMensajes = signal<boolean>(false);
  listaMensajes: Mensaje[] = [];
  mensajes = signal<EntradaMensaje[]>([]);
  email: string;
  actualizarScroll$: Subject<undefined> = new Subject();

  constructor(private incidenciasService: IncidenciasService, email: string) {
    this.email = email;
  }

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
      next: (incidencias: Incidencia[]) => {
        console.log('incidencia creada: ', incidencias);
        const copia = [...incidencias, ...this.lista()];
        this.lista.set(copia);        
        console.log('nueva lista: ', this.lista());
        this.procesando.set(false);
        this.actualizarScroll$.next(undefined);
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
        console.log('msg: ', msg);
        this.listaMensajes = [...this.listaMensajes??[], msg[0]];
        console.log('nueva lista: ', this.listaMensajes);
        this.mensajes.set(this.mensajesProcesados(this.listaMensajes)); 
        this.procesando.set(false);
      }
    })
  }

  cargarMensajes(id: number) {
    console.log('cargar mensajes: ', id);
    this.incidenciasService.recuperarMensajes(id).subscribe({
      next: (lista: Mensaje[]) => {
        this.listaMensajes = lista;
        this.mensajes.set(this.mensajesProcesados(lista));        
      }
    })
  }

  mensajesProcesados(lista: Mensaje[]): EntradaMensaje[] {
    const res: EntradaMensaje[] = [];
    if (!lista || lista.length === 0) return res;
    
    let fecha = new Date(lista[0].fecha);
    res.push({ tipo: TipoEntradaMensaje.fecha, fecha: Fecha.formato(fecha) });
    let index = 0;
    do {
      let fechaActual = new Date(lista[index].fecha);
      if (!Fecha.mismoDia(fechaActual, fecha)) {
        fecha = fechaActual;
        res.push({ tipo: TipoEntradaMensaje.fecha, fecha: Fecha.formato(fecha) });
      }
      res.push({
        tipo: lista[index].usuario === this.email ? TipoEntradaMensaje.mio : TipoEntradaMensaje.otro,
        texto: lista[index].texto,
        imagen: lista[index].imagen,
        usuario: lista[index].usuario,
        hora: Fecha.hora(fechaActual)
      });
      index++;
    } while (index < lista.length);
    return res;
  }

  finalizar(id: number) {
    console.log('finalizando...');
    this.procesando.set(true);
    this.incidenciasService.finalizarIncidencia(id, this.idNodo!).subscribe({
      next: (lista: Incidencia[]) => {
        console.log('respuesta finalizando: ', lista);
        this.lista.set(lista ?? []);
        this.procesando.set(false);
      },
    })
  }
}

export interface EntradaMensaje {
  tipo: TipoEntradaMensaje,
  fecha?: string,
  hora?: string,
  usuario?: string,
  texto?: string,
  imagen?: string
}
