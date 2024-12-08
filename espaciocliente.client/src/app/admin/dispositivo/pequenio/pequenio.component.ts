import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CabeceraComponent } from '../../../shared/components/cabecera/cabecera.component';
import { SelectorVistaAdminComponent } from '../../../shared/components/selector-vista-admin/selector-vista-admin.component';
import { ArbolComponent } from '../../arbol/arbol.component';
import { UsuarioComponent } from '../../usuario/usuario.component';
import { EstadoService } from '../../../shared/estado/estado.service';
import { Admin } from '../../admin';
import { VistaSeleccionadaAdmin } from '../../../shared/enumerados/vista-seleccionada-admin';

@Component({
  selector: 'app-pequenio',
  standalone: true,
  imports: [CommonModule, CabeceraComponent, SelectorVistaAdminComponent, ArbolComponent, UsuarioComponent],
  templateUrl: './pequenio.component.html',
  styleUrl: './pequenio.component.css'
})
export class PequenioComponent {
  VistaSeleccionadaAdmin = VistaSeleccionadaAdmin;
  admin: Admin;

  constructor(private estadoService: EstadoService) {
    this.admin = this.estadoService.admin;
  }
}
