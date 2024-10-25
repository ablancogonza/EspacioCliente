import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BuscadorFiltroComponent } from './buscador-filtro/buscador-filtro.component';
import { EstadoService } from '../../servicios/estado.service';
import { Filtro } from '../../estado/filtro';


@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [CommonModule, BuscadorFiltroComponent],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  filtro!: Filtro;
  constructor(private estadoService: EstadoService) {
    this.filtro = estadoService.filtro;
  }

}
