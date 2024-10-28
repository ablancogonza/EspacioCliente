import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { BuscadorFiltroComponent } from './buscador-filtro/buscador-filtro.component';
import { EstadoService } from '../../servicios/estado.service';
import { Filtro } from '../../estado/filtro';
import { FormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, BuscadorFiltroComponent],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  filtro: Filtro; 
  constructor(private estadoService: EstadoService) {
    this.filtro = estadoService.filtro;    
  }

}
