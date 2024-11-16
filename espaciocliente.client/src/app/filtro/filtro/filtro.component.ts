import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { EstadoService } from '../../shared/estado/estado.service';
import { BuscadorFiltroComponent } from '../buscador-filtro/buscador-filtro.component';
import { Filtro } from '../filtro';


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

