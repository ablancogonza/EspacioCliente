import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { Arbol as UtilsArbol } from '../../shared/utils/arbol';
import { EstadoService } from '../../shared/estado/estado.service';
import { Admin } from '../admin';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeModule, SpeedDialModule, InputTextModule, DialogModule, CargandoComponent],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent {

  admin: Admin;

  constructor(private estadoService: EstadoService) {
    this.admin = estadoService.admin;
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
