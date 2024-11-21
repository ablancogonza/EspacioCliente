import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { SelectorVistaComponent } from '../selector-vista/selector-vista.component';
import { Observable } from 'rxjs';
import { NodoInversionComponent } from '../nodo-inversion/nodo-inversion.component';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ArbolComponent } from '../../../arbol-cliente/arbol/arbol.component';
import { MapaComponent } from '../../../mapa/mapa/mapa.component';
import { VistaSeleccionada } from '../../enumerados/vista-seleccionada';
import { EstadoService } from '../../estado/estado.service';
import { GraficosComponent } from '../../../graficos/graficos/graficos.component';
import { IncidenciasComponent } from '../../../incidencias/incidencias/incidencias.component';
import { BriefingComponent } from '../../../briefing/briefing/briefing.component';


@Component({
  selector: 'app-dispositivo-grande',
  standalone: true,
  imports: [CommonModule,
    SplitterModule,
    CabeceraComponent,
    ArbolComponent,
    SelectorVistaComponent,   
    MapaComponent,
    GraficosComponent,
    NodoInversionComponent,
    IncidenciasComponent,
    BriefingComponent
  ],
  templateUrl: './dispositivo-grande.component.html',
  styleUrl: './dispositivo-grande.component.css'
})
export class DispositivoGrandeComponent {
  public vista = VistaSeleccionada;
  //vista$: Observable<VistaSeleccionada>;
  constructor(public estadoService: EstadoService) {
    //this.vista$ = estadoService.selectorVista.vista$;
  }

}
