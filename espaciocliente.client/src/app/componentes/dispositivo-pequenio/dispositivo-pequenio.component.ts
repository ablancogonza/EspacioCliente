import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { ArbolComponent } from '../arbol/arbol.component';
import { SelectorVistaComponent } from '../selector-vista/selector-vista.component';

@Component({
  selector: 'app-dispositivo-pequenio',
  standalone: true,
  imports: [CommonModule, CabeceraComponent, ArbolComponent, SelectorVistaComponent],
  templateUrl: './dispositivo-pequenio.component.html',
  styleUrl: './dispositivo-pequenio.component.css'
})
export class DispositivoPequenioComponent {

}
