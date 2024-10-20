import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ArbolComponent } from '../arbol/arbol.component';
import { SelectorVistaComponent } from '../selector-vista/selector-vista.component';
import { EstadoService } from '../../servicios/estado.service';
import { VistaSeleccionada } from '../../enumerados/vista-seleccionada';
import { Observable } from 'rxjs';
import { ContenedorGraficosComponent } from '../contenedor-graficos/contenedor-graficos.component';
import { MapaComponent } from '../mapa/mapa.component';
import { ContenedorConversacionesComponent } from '../contenedor-conversaciones/contenedor-conversaciones.component';

@Component({
  selector: 'app-dispositivo-grande',
  standalone: true,
  imports: [CommonModule, SplitterModule, CabeceraComponent, ArbolComponent, SelectorVistaComponent, ContenedorGraficosComponent, MapaComponent, ContenedorConversacionesComponent],
  templateUrl: './dispositivo-grande.component.html',
  styleUrl: './dispositivo-grande.component.css'
})
export class DispositivoGrandeComponent {
  vista$: Observable<VistaSeleccionada>;
  constructor(private estadoService: EstadoService) {
    this.vista$ = estadoService.selectorVista.vista$;
  }

}
