import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ArbolComponent } from '../arbol/arbol.component';
import { SelectorVistaComponent } from '../selector-vista/selector-vista.component';
import { MapaComponent } from '../mapa/mapa.component';
import { ContenedorGraficosComponent } from '../contenedor-graficos/contenedor-graficos.component';
import { ContenedorConversacionesComponent } from '../contenedor-conversaciones/contenedor-conversaciones.component';
import { Observable } from 'rxjs';
import { VistaSeleccionada } from '../../enumerados/vista-seleccionada';
import { EstadoService } from '../../servicios/estado.service';
import { NodoInversionComponent } from '../nodo-inversion/nodo-inversion.component';

@Component({
  selector: 'app-dispositivo-pequenio',
  standalone: true,
  imports: [CommonModule,
    CabeceraComponent,
    ArbolComponent,
    SelectorVistaComponent,
    ArbolComponent,
    MapaComponent,
    ContenedorGraficosComponent,
    ContenedorConversacionesComponent,
    NodoInversionComponent
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
