import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { SelectorVistaComponent } from '../../shared/components/selector-vista/selector-vista.component';
import { Observable } from 'rxjs';
import { NodoInversionComponent } from '../../shared/components/nodo-inversion/nodo-inversion.component';
import { CabeceraComponent } from '../../shared/components/cabecera/cabecera.component';
import { ArbolComponent } from '../../arbol-cliente/arbol/arbol.component';
import { MapaComponent } from '../../mapa/mapa/mapa.component';
import { VistaSeleccionada } from '../../shared/enumerados/vista-seleccionada';
import { EstadoService } from '../../shared/estado/estado.service';
import { GraficosComponent } from '../../graficos/graficos/graficos.component';
import { IncidenciasComponent } from '../../incidencias/incidencias/incidencias.component';


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
    IncidenciasComponent    
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
