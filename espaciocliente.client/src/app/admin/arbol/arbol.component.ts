import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { Arbol as UtilsArbol } from '../../shared/utils/arbol';
import { EstadoService } from '../../shared/estado/estado.service';
import { Admin } from '../admin';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeModule, SpeedDialModule],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent {

  admin: Admin;
  items: MenuItem[] | null = [];
  constructor(private estadoService: EstadoService) {
    this.admin = estadoService.admin;
  }

  defineMenu() {
    this.items = [
      {
        tooltipOptions: {
          tooltipLabel: 'Editar'
        },
        icon: 'pi pi-pencil',
        command: () => {
          //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        },
        disabled: !this.admin.nodoSeleccionado$.value || !this.admin.nodoSeleccionado$.value.data
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Recargar'
        },
        icon: 'pi pi-refresh',
        command: () => {
          this.admin.recargarRaices();
          //this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Borrar'
        },
        icon: 'pi pi-trash',
        command: () => {
          //this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Nueva raiz'
        },
        icon: 'pi pi-reply',
        command: () => {
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Nuevo nodo'
        },
        icon: 'pi pi-arrow-down-right',
        command: () => { }
      }
    ];
  }

  toolTipNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return `${UtilsArbol.desTipoNodo(n.data.IdTipoNodo)}: ${n.label}`;
  }

  tipoNodo(n: TreeNode): string {
    if (!n.data || !n.data.IdTipoNodo) return '';
    return UtilsArbol.tipoNodo(n.data.IdTipoNodo);
  }

}
