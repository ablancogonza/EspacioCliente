import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { Arbol as UtilsArbol } from '../../shared/utils/arbol';
import { EstadoService } from '../../shared/estado/estado.service';
import { Admin } from '../admin';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';
import { Arbol } from '../arbol';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeModule, SpeedDialModule, InputTextModule, DialogModule, CargandoComponent],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent implements OnInit {

  arbol: Arbol;

  constructor(private estadoService: EstadoService) {
    this.arbol = estadoService.arbolAdmin;
  }

  ngOnInit(): void {
    this.arbol.recargarRaices();
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
