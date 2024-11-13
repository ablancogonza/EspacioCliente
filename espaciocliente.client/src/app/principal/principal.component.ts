import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContenedorResponsiveComponent } from '../shared/components/contenedor-responsive/contenedor-responsive.component';
import { ContenedorComponent } from '../shared/components/contenedor/contenedor.component';
import { NodoInversionComponent } from '../componentes/nodo-inversion/nodo-inversion.component';
import { ContenedorGraficosComponent } from '../componentes/contenedor-graficos/contenedor-graficos.component';
import { ContenedorConversacionesComponent } from '../componentes/contenedor-conversaciones/contenedor-conversaciones.component';
import { SelectorVistaComponent } from '../componentes/selector-vista/selector-vista.component';
import { SplitterModule } from 'primeng/splitter';
import { ArbolComponent } from '../componentes/arbol/arbol.component';
import { MapaComponent } from '../componentes/mapa/mapa.component';
import { CabeceraComponent } from '../shared/components/cabecera/cabecera.component';
import { EstadoService } from '../servicios/estado.service';
import { VistaSeleccionada } from '../enumerados/vista-seleccionada';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule,
    ContenedorResponsiveComponent,
    ContenedorComponent,
    NodoInversionComponent,
    ContenedorGraficosComponent,
    ContenedorConversacionesComponent,
    SelectorVistaComponent,
    SplitterModule,
    ArbolComponent,
    MapaComponent,
    CabeceraComponent,

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
