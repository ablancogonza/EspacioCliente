import { signal } from "@angular/core";
import { TreeNode } from "primeng/api";
import { TreeNodeExpandEvent, TreeNodeSelectEvent } from "primeng/tree";
import { BehaviorSubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { ArbolService } from "./arbol.service";
import { Nodo } from "./nodo";
import { FiltroActivo } from "../filtro/filtro-activo";

export class Arbol {
 
  arbol$: BehaviorSubject<TreeNode[]> = new BehaviorSubject([{}]); //  = signal<TreeNode[]>([]);
  nodoSeleccionado$: BehaviorSubject<TreeNode> = new BehaviorSubject({});
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
        this.arbol$.next(raiz);
        //if (raiz.length > 0) this.nodoSeleccionado$.next(raiz[0]);
        if (raiz.length == 1) {
          this.cargaDescendientes(raiz[0]);
        }
      }, error: (error: HttpErrorResponse) => {
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
        this.arbol$.next([...this.arbol$.value]);
        if (nodo.children.length === 1) {
          this.cargaDescendientes(nodo.children[0]);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });
  }

  repintar(f: FiltroActivo): void {
    if (f.id) {
      this.seccionArbol(f.id);
    } else {
      this.init();
    }
  }

  seccionArbol(id: number) {
    this.arbolService.desdeNodo(id).subscribe({
      next: (nodos) => {
        console.log('secciónArbol: ', nodos);
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
        this.arbol$.next(raiz);
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

  eliminar() {
    this.arbolService.eliminar(this.nodoSeleccionado$.value);
  }

}
