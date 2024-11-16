import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorResponsiveComponent } from '../shared/components/contenedor-responsive/contenedor-responsive.component';
import { ContenedorComponent } from '../shared/components/contenedor/contenedor.component';
import { NodoInversionComponent } from '../shared/components/nodo-inversion/nodo-inversion.component';

import { SelectorVistaComponent } from '../shared/components/selector-vista/selector-vista.component';
import { SplitterModule } from 'primeng/splitter';
import { GraficosComponent } from '../graficos/graficos/graficos.component';
import { CabeceraComponent } from '../shared/components/cabecera/cabecera.component';
import { ListaIncidenciasComponent } from '../incidencias/lista-incidencias/lista-incidencias.component';
import { ArbolComponent } from '../arbol-cliente/arbol/arbol.component';
import { MapaComponent } from '../mapa/mapa/mapa.component';
import { VistaSeleccionada } from '../shared/enumerados/vista-seleccionada';
import { EstadoService } from '../shared/estado/estado.service';
import { DispositivoPequenioComponent } from '../componentes/dispositivo-pequenio/dispositivo-pequenio.component';
import { DispositivoGrandeComponent } from '../componentes/dispositivo-grande/dispositivo-grande.component';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule,
    ContenedorResponsiveComponent,
    ContenedorComponent,
    NodoInversionComponent,
    GraficosComponent,
    ListaIncidenciasComponent,
    SelectorVistaComponent,
    SplitterModule,
    ArbolComponent,
    MapaComponent,
    CabeceraComponent,
    DispositivoPequenioComponent,
    DispositivoGrandeComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  public vista = VistaSeleccionada;
  ancho: number = 0;

  constructor(public estadoService: EstadoService) { }

  anchoCambiado(width: number) {
    this.ancho = width;
    console.log('ancho: ', this.ancho);
  }
}
