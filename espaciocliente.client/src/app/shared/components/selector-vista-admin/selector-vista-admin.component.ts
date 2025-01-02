import { CommonModule } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EstadoService } from '../../estado/estado.service';
import { VistaSeleccionadaAdmin } from '../../enumerados/vista-seleccionada-admin';
import { Admin } from '../../../admin/admin';

@Component({
  selector: 'app-selector-vista-admin',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './selector-vista-admin.component.html',
  styleUrl: './selector-vista-admin.component.css',
  providers: [DialogService]
})
export class SelectorVistaAdminComponent {
  VistaSeleccionada = VistaSeleccionadaAdmin;
  visibles: number[] = Object.values(VistaSeleccionadaAdmin).filter(r => typeof r === 'number') as number[];  
  admin: Admin;
   
  ref: DynamicDialogRef | undefined;

  constructor(private estadoService: EstadoService) {
    this.admin = this.estadoService.admin; 
  }

  selecciona(vista: VistaSeleccionadaAdmin): void {    
    this.admin.vistaSeleccionada.set(vista);  
  }

  icono(i: number): string {
    switch (i) {
      case VistaSeleccionadaAdmin.arbol:
        return 'pi pi-folder-open';
      case VistaSeleccionadaAdmin.usuario:
        return 'pi pi-user';      
      default:
        return '';
    }
  }

  title(i: number): string {
    switch (i) {
      case VistaSeleccionadaAdmin.arbol:
        return 'Árbol de clientes';
      case VistaSeleccionadaAdmin.usuario:
        return 'Usuarios';      
      default:
        return '';
    }
  }
}
