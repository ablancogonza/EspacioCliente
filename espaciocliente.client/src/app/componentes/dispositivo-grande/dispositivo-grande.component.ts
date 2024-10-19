import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ArbolComponent } from '../arbol/arbol.component';
import { SelectorVistaComponent } from '../selector-vista/selector-vista.component';

@Component({
  selector: 'app-dispositivo-grande',
  standalone: true,
  imports: [CommonModule, SplitterModule, CabeceraComponent, ArbolComponent, SelectorVistaComponent],
  templateUrl: './dispositivo-grande.component.html',
  styleUrl: './dispositivo-grande.component.css'
})
export class DispositivoGrandeComponent {

}
