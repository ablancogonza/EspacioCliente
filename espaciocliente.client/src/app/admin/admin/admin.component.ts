import { Component, HostListener } from '@angular/core';
import { EstadoService } from '../../shared/estado/estado.service';
import { CommonModule } from '@angular/common';
import { PequenioComponent } from '../dispositivo/pequenio/pequenio.component';
import { GrandeComponent } from '../dispositivo/grande/grande.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PequenioComponent, GrandeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.ancho = width;    
  }
  
  ancho: number = 0;

  constructor(public estadoService: EstadoService) {
    this.ancho = window.innerWidth;
  }

  anchoCambiado(width: number) {
    this.ancho = width;
  }
}
