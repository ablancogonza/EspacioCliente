import { signal } from "@angular/core";
import { TipoEntradaMensaje } from "../shared/enumerados/tipo-entrada-mensaje";
import { Fecha } from "../shared/utils/fecha";
import { BehaviorSubject, Subject } from "rxjs";
import { IncidenciasService } from "./incidencias.service";
import { Incidencia } from "./incidencia";
import { Mensaje } from "./mensaje";
import { EntradaMensaje } from "./entrada-mensaje";
import { Nodo } from "../arbol-cliente/nodo";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IncidenciasPendientes } from "../shared/dtos/incidencias-pendientes";

export class Incidencias {
 
  nodo: Nodo | undefined = undefined;
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
  noLeidos$: BehaviorSubject<IncidenciasPendientes[]> = new BehaviorSubject([] as IncidenciasPendientes[]);

  constructor(private incidenciasService: IncidenciasService, private mensajesService: MensajesService, email: string) {
    this.email = email;

    this.recuperarIncidenciasPendientes();
  }

  setNodo(nodo: Nodo | undefined) {
    console.log('setNodo incidencias: ', nodo);
    this.vista.set('lista');
    this.lista.set([]);
    this.listaMensajes = [];
    this.nodo = nodo;    
    if (nodo) this.recuperarIncidencias(nodo!.Id);    
  }

  recuperarIncidencias(id: number) {
    this.procesando.set(true);    
    this.incidenciasService.recuperarIncidencias(id).subscribe({
      next: (lista: Incidencia[]) => {        
        this.lista.set(lista ?? []);
        this.procesando.set(false);
      },
      error: (err) => {        
        this.procesando.set(false);
        this.mensajesService.errorHttp(err);
      }
    })
  }

  nuevo() {
    this.visibleNuevaIncidencia = true;
  }

  aceptaNuevaIncidencia() {
    this.procesando.set(true);
    this.incidenciasService.crear(this.nodo!.Id, this.titulo).subscribe({
      next: (incidencias: Incidencia[]) => {        
        const copia = [...incidencias, ...this.lista()];
        this.lista.set(copia);                
        this.procesando.set(false);
        this.actualizarScroll$.next(undefined);
      },
      error: (err) => {        
        this.procesando.set(false);
        this.mensajesService.errorHttp(err);
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
        this.listaMensajes = [...this.listaMensajes??[], msg[0]];        
        this.mensajes.set(this.mensajesProcesados(this.listaMensajes)); 
        this.procesando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    })
  }

  despuesDeImagenUpload(m: Mensaje) {
    this.listaMensajes = [...this.listaMensajes ?? [], m];
    this.mensajes.set(this.mensajesProcesados(this.listaMensajes));
    this.procesando.set(false);
  }

  cargarMensajes(id: number) {    
    this.incidenciasService.recuperarMensajes(id).subscribe({
      next: (lista: Mensaje[]) => {
        this.listaMensajes = lista;
        this.mensajes.set(this.mensajesProcesados(lista));
        if (this.seleccionada && (this.seleccionada?.noLeidos??0) > 0 && lista.length > 0) {
          this.seleccionada!.noLeidos = 0;
          const ultimo = lista[lista.length - 1].id;
          this.incidenciasService.marcarLeidos(this.seleccionada!.id, ultimo).subscribe({
            next: () => {
              this.recuperarIncidenciasPendientes();
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
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
    console.log('mensajes procesados: ', res);
    return res;
  }

  finalizar(id: number) {   
    this.procesando.set(true);
    this.incidenciasService.finalizarIncidencia(id, this.nodo!.Id).subscribe({
      next: (lista: Incidencia[]) => {        
        this.lista.set(lista ?? []);
        this.procesando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    })
  }

  nodoCampania(): boolean {
    if (!this.nodo) return false;
    return this.nodo.IdTipoNodo === 6;       
  }

  buscaNuevosMensajes() {   
    if (!this.seleccionada) return;
    this.cargarMensajes(this.seleccionada!.id);
  }

  recuperarIncidenciasPendientes() {
    this.incidenciasService.recuperarMensajesPendientes().subscribe({
      next: (lista: IncidenciasPendientes[]) => {
        this.noLeidos$.next(lista);        
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    })
  }
}
