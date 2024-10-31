import { Injectable } from '@angular/core';
import { Sesion } from '../estado/sesion';
import { Arbol } from '../estado/arbol';
import { ArbolService } from './arbol.service';
import { SelectorVista } from '../estado/selector-vista';
import { Dispositivo } from '../estado/dispositivo';
import { Filtro } from '../estado/filtro';
import { FiltroService } from './filtro.service';
import { MensajesService } from './mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  sesion!: Sesion;
  arbol!: Arbol;
  selectorVista!: SelectorVista;
  dispositivo!: Dispositivo;
  filtro!: Filtro;

  constructor(private arbolService: ArbolService,
    private filtroService: FiltroService,
    private mensajesService: MensajesService) { }

  init(email: string, token: string) {
    this.sesion = new Sesion();
    this.sesion.setEmail(email);
    this.sesion.setToken(token);
    this.dispositivo = new Dispositivo();
    this.arbol = new Arbol(this.arbolService, this.mensajesService);
    this.selectorVista = new SelectorVista();    
    this.filtro = new Filtro(this.filtroService);
    this.filtro.init();
    this.arbol.init();
  }

  
  cerrarSesion() {
    this.sesion.setToken('');
    this.sesion.setEmail('');
    this.arbol = new Arbol(this.arbolService, this.mensajesService);
    this.selectorVista = new SelectorVista();
    this.dispositivo = new Dispositivo();
    this.filtro = new Filtro(this.filtroService);
  }

  guardar() {
    const estado = {
      token: this.sesion.getToken(),
      arbol: this.arbol.arbol$.value,
      nodoSeleccionado: this.arbol.nodoSeleccionado$.value,
      vista: this.selectorVista.vista$.value
    };
    //localStorage.setItem('token', this.sesion.getToken());
  } 
}
