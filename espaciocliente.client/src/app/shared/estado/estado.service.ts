import { Injectable } from '@angular/core';
import { Sesion } from '../../auth/sesion';
import { Arbol } from '../../arbol-cliente/arbol';
import { Incidencias } from '../../incidencias/incidencias';
import { ArbolService } from '../../arbol-cliente/arbol.service';
import { Mapa } from '../../mapa/mapa';
import { Grafico } from '../../graficos/grafico';
import { MapaService } from '../../mapa/mapa.service';
import { IncidenciasService } from '../../incidencias/incidencias.service';
import { MensajesService } from '../servicios/mensajes.service';
import { InversionService } from '../servicios/inversion.service';
import { SelectorVista } from './selector-vista';
import { Filtro } from '../../filtro/filtro';
import { FiltroService } from '../../filtro/filtro.service';
import { BehaviorSubject } from 'rxjs';
import { Briefing } from '../../briefing/briefing';
import { BriefingService } from '../../briefing/briefing.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  sesion!: Sesion;
  arbol!: Arbol;
  selectorVista!: SelectorVista;
  filtro!: Filtro;
  grafico!: Grafico;
  mapa!: Mapa;
  incidencias!: Incidencias;
  briefing!: Briefing;
  dispositivoMovil$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private arbolService: ArbolService,
    private filtroService: FiltroService,
    private inversionService: InversionService,
    private mapaService: MapaService,
    private incidenciasService: IncidenciasService,
    private briefingService: BriefingService,
    private mensajesService: MensajesService) { }

  init(email: string, token: string) {
    this.sesion = new Sesion();
    this.sesion.setEmail(email);
    this.sesion.setToken(token);    
    this.arbol = new Arbol(this.arbolService, this.mensajesService);
    this.selectorVista = new SelectorVista();
    this.filtro = new Filtro(this.filtroService, this.mensajesService);
    this.grafico?.destroy();
    this.grafico = new Grafico(this.inversionService, this.mensajesService);
    this.mapa = new Mapa(this.mapaService);
    this.incidencias = new Incidencias(this.incidenciasService, email);
    this.briefing = new Briefing(this.briefingService);
  }

  postInit() {
    console.log('postInit');
    this.filtro.init();
    this.arbol.init();
  }
  
  cerrarSesion() {
    this.sesion.setToken('');
    this.sesion.setEmail('');   
    this.grafico?.destroy();    
  }

 
}
