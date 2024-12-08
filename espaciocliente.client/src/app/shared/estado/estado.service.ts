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
import { SelectorVista } from './selector-vista';
import { Filtro } from '../../filtro/filtro';
import { FiltroService } from '../../filtro/filtro.service';
import { BehaviorSubject } from 'rxjs';
import { Briefing } from '../../briefing/briefing';
import { BriefingService } from '../../briefing/briefing.service';
import { GraficosService } from '../../graficos/graficos.service';
import { Rol } from '../enumerados/rol';
import { Admin } from '../../admin/admin';

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
  admin!: Admin;

  constructor(private arbolService: ArbolService,
    private filtroService: FiltroService,
    private graficoService: GraficosService,
    private mapaService: MapaService,
    private incidenciasService: IncidenciasService,
    private briefingService: BriefingService,
    private mensajesService: MensajesService) { }

  init(email: string, token: string, rol: number) {
    this.sesion = new Sesion(email, token, rol);
    if (rol !== Rol.admin) {
      this.arbol = new Arbol(this.arbolService, this.mensajesService);
      this.selectorVista = new SelectorVista();
      this.filtro = new Filtro(this.filtroService, this.mensajesService);
      this.grafico = new Grafico(this.graficoService, this.mensajesService);
      this.mapa = new Mapa(this.mapaService, this.mensajesService);
      this.incidencias = new Incidencias(this.incidenciasService, this.mensajesService, email);
      this.briefing = new Briefing(this.briefingService, this.mensajesService);
    } else {
      this.admin = new Admin();
    }
  }

  postInit() {
    if (this.sesion.getRol() !== Rol.admin) {
      this.filtro.init();
      this.arbol.init();
    }
  }
  
  cerrarSesion() {
    this.sesion.close();    
  }

 
}
