import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { ArbolComponent } from '../../arbol/arbol.component';
import { UsuarioComponent } from '../../usuario/usuario.component';
import { CabeceraComponent } from '../../../shared/components/cabecera/cabecera.component';
import { Admin } from '../../admin';
import { EstadoService } from '../../../shared/estado/estado.service';

@Component({
  selector: 'app-grande',
  standalone: true,
  imports: [CommonModule, CabeceraComponent, SplitterModule, ArbolComponent, UsuarioComponent],
  templateUrl: './grande.component.html',
  styleUrl: './grande.component.css'
})
export class GrandeComponent {
  admin: Admin;

  constructor(private estadoService: EstadoService) {
    this.admin = this.estadoService.admin;
  }
}
