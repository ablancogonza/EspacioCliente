import { Component, HostListener } from '@angular/core';
import { EstadoService } from '../../shared/estado/estado.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.ancho = width;
    this.estadoService?.dispositivoMovil$.next(width < 768);
  }
  //public vista = VistaSeleccionada;
  ancho: number = 0;

  constructor(public estadoService: EstadoService) {
    this.ancho = window.innerWidth;
    this.estadoService?.dispositivoMovil$.next(this.ancho < 768);
  }

  anchoCambiado(width: number) {
    this.ancho = width;
  }
}
