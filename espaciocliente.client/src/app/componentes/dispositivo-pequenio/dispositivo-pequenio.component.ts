import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SelectorVistaComponent } from '../../shared/components/selector-vista/selector-vista.component';

import { Observable } from 'rxjs';

import { NodoInversionComponent } from '../../shared/components/nodo-inversion/nodo-inversion.component';
import { MapaComponent } from '../../mapa/mapa/mapa.component';
import { ArbolComponent } from '../../arbol-cliente/arbol/arbol.component';
import { CabeceraComponent } from '../../shared/components/cabecera/cabecera.component';
import { VistaSeleccionada } from '../../shared/enumerados/vista-seleccionada';
import { EstadoService } from '../../shared/estado/estado.service';
import { GraficosComponent } from '../../graficos/graficos/graficos.component';
import { IncidenciasComponent } from '../../incidencias/incidencias/incidencias.component';
import { BriefingComponent } from '../../briefing/briefing/briefing.component';

@Component({
  selector: 'app-dispositivo-pequenio',
  standalone: true,
  imports: [CommonModule,
    CabeceraComponent,
    ArbolComponent,
    SelectorVistaComponent,
    ArbolComponent,
    MapaComponent,    
    NodoInversionComponent,
    GraficosComponent,
    IncidenciasComponent,
    BriefingComponent
  ],
  templateUrl: './dispositivo-pequenio.component.html',
  styleUrl: './dispositivo-pequenio.component.css'
})
export class DispositivoPequenioComponent {
  public vista = VistaSeleccionada;
  //vista$: Observable<VistaSeleccionada>;
  
  constructor(public estadoService: EstadoService) {
    //this.vista$ = estadoService.selectorVista.vista$;
  }
}
