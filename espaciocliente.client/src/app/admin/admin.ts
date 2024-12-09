import { signal } from "@angular/core";
import { VistaSeleccionadaAdmin } from "../shared/enumerados/vista-seleccionada-admin";
import { TreeNode } from "primeng/api";
import { AdminService } from "./admin.service";
import { Nodo } from "../arbol-cliente/nodo";
import { HttpErrorResponse } from "@angular/common/http";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { TreeNodeExpandEvent, TreeNodeSelectEvent } from "primeng/tree";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class Admin {
  vistaSeleccionada = signal<VistaSeleccionadaAdmin>(VistaSeleccionadaAdmin.arbol);
  arbol = signal<TreeNode[]>([]);
  nodoSeleccionado$: BehaviorSubject<TreeNode> = new BehaviorSubject({});

  constructor(private adminService: AdminService, private mensajesService: MensajesService) { }


  init() {
    this.recargarRaices();
  }

  recargarRaices() {
    this.adminService.raices().subscribe({
      next: (nodos) => {
        const raiz: TreeNode[] = [];
        nodos?.forEach((nodo: Nodo) => {
          raiz.push({
            key: nodo.Id.toString(),
            label: nodo.Descripcion,
            children: [],
            data: nodo,
            leaf: nodo.IdTipoNodo == 6,
            loading: false
          });
        });
        this.arbol.set(raiz);
        if (raiz.length == 1) {
          this.cargaDescendientes(raiz[0]);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.mensajesService.errorHttp(error);
      }
    });
  }

  cargaDescendientes(nodo: TreeNode) {
    nodo.loading = true;
    this.adminService.descendientes(nodo.key!).subscribe({
      next: (nodos: Nodo[]) => {
        nodo.children = [];
        nodos?.forEach((nod: Nodo) => {
          nodo.children!.push({
            key: nod.Id.toString(),
            label: nod.Descripcion,
            children: [],
            data: nod,
            leaf: nod.IdTipoNodo == 6,
            loading: false
          });
        });
        nodo.loading = false;
        nodo.expanded = true;
        if (nodo.children.length === 1) {
          this.cargaDescendientes(nodo.children[0]);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });
  }

  nodoSeleccionado(): TreeNode | undefined {
    return undefined;
  }

  nodoExpandido(e: TreeNodeExpandEvent) {
    this.cargaDescendientes(e.node);
  }

  nodeSelect(e: TreeNodeSelectEvent) {
    this.nodoSeleccionado$.next(e.node);
  }

  arbolMenu() {

  }
}
