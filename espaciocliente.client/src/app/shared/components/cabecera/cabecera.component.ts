import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { EstadoService } from '../../estado/estado.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  email: string = '';
  constructor(private router: Router, private estadoService: EstadoService) {
    this.email = estadoService?.sesion?.getEmail() ?? '';
  }

  cerrarSesion() {
    this.estadoService.cerrarSesion();
    this.router.navigateByUrl('/');
  }
}
