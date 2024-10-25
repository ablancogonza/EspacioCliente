import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TreeModule } from 'primeng/tree';
import { EstadoService } from '../../servicios/estado.service';
import { Arbol } from '../../estado/arbol';
import { NodoComponent } from './nodo/nodo.component';
import { ArbolService } from '../../servicios/arbol.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [CommonModule, TreeModule, NodoComponent],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent {
  arbol: Arbol;
  loading = false;
  constructor(private estado: EstadoService) {
    this.arbol = estado.arbol;
  };

  
}
