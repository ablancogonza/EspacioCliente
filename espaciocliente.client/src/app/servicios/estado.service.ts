import { Injectable } from '@angular/core';
import { Sesion } from '../estado/sesion';
import { Arbol } from '../estado/arbol';
import { ArbolService } from './arbol.service';
import { SelectorVista } from '../estado/selector-vista';
import { Dispositivo } from '../estado/dispositivo';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private arbolService: ArbolService) { }

  sesion: Sesion = new Sesion();
  arbol: Arbol = new Arbol(this.arbolService);
  selectorVista: SelectorVista = new SelectorVista();
  dispositivo: Dispositivo = new Dispositivo();
}
