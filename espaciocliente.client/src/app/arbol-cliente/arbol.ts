import { signal } from "@angular/core";
import { TreeNode } from "primeng/api";
import { TreeNodeExpandEvent, TreeNodeSelectEvent } from "primeng/tree";
import { BehaviorSubject, timer } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { ArbolService } from "./arbol.service";
import { Nodo } from "./nodo";

export class Arbol {
 
  arbol = signal<TreeNode[]>([]);
  nodoSeleccionado$: BehaviorSubject<TreeNode> = new BehaviorSubject({});
  scrollArbol = signal<number>(0);
  constructor(private arbolService: ArbolService, private mensajesService: MensajesService) { }

  init() {    
    this.arbolService.raiz().subscribe({
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
    this.arbolService.descendientes(nodo.key!).subscribe({
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

  setNodo(n: number | undefined): void {

  }

  nuevoArbol(id: number | undefined): void {
    console.log('nuevoArbol: ', id);
    if (id) {
      this.seccionArbol(id);
    } else {
      this.init();
      this.nodoSeleccionado$.next({});
      console.log('nodo seleccionado vacío');
    }    
  }

  private seccionArbol(id: number) {
    this.arbolService.desdeNodo(id).subscribe({
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
        if (raiz.length > 0) this.nodoSeleccionado$.next(raiz[0]);
        if (raiz.length == 1) {
          this.cargaDescendientes(raiz[0]);
        }
      }, error: (error: HttpErrorResponse) => {
        this.mensajesService.errorHttp(error);
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

  recargarNodo() {
    const nodo = this.nodoSeleccionado$.value
    if (nodo) {
      nodo.children = [];
      nodo.expanded = false;
      this.cargaDescendientes(nodo);      
    }
  }
 
}
