import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { EstadoService } from '../../shared/estado/estado.service';
import { Admin } from '../admin';
import { Arbol as UtilsArbol } from '../../shared/utils/arbol';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { TreeModule } from 'primeng/tree';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeModule, SpeedDialModule, InputTextModule, DialogModule, CargandoComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario;

  constructor(private estadoService: EstadoService) {
    this.usuario = estadoService.usuarioAdmin;
  }


  ngOnInit(): void {
    this.usuario.recargarRaices();
  }

  toolTipNodo(n: TreeNode): string {
    return n.leaf ? "Nodo" : "Usuario";    
  }

  tipoNodo(n: TreeNode): string {
    return n.leaf ? "NO" : "US";    
  }

}
