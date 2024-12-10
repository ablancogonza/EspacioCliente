import { signal } from "@angular/core";
import { VistaSeleccionadaAdmin } from "../shared/enumerados/vista-seleccionada-admin";
import { MenuItem, TreeNode } from "primeng/api";
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
  arbolOperacion: 'nuevaRaiz' | 'nuevoNodo' | 'editar' | undefined = undefined;
  tituloVentanaNodo: string = '';
  visibleVentanaNodo: boolean = false;
  descripcionNodoVentana: string = '';
  items: MenuItem[] | null = [];




  cargando = false;

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

  arbolOperacionNuevoNodoRaiz() {
    this.tituloVentanaNodo = 'Nuevo nodo raíz';
    this.arbolOperacion = 'nuevaRaiz';
    this.visibleVentanaNodo = true;
  }

  arbolOperacionNuevoNodo() {
    this.tituloVentanaNodo = 'Nuevo nodo';
    this.arbolOperacion = 'nuevoNodo';
    this.visibleVentanaNodo = true;
  }

  arbolOperacionEditar() {
    this.tituloVentanaNodo = 'Editar nodo';
    this.arbolOperacion = 'editar';
    this.visibleVentanaNodo = true;
  }

  arbolOperacionReset() {
    this.tituloVentanaNodo = '';
    this.arbolOperacion = undefined;
    this.visibleVentanaNodo = false;
    this.descripcionNodoVentana = '';
  }

  guardarDescripcion() {
    this.cargando = true;
    this.visibleVentanaNodo = false;
    const descripcion = this.descripcionNodoVentana;
    switch (this.arbolOperacion) {
      case 'nuevaRaiz':
        this.adminService.nuevoNodo(undefined, descripcion).subscribe({
          next: () => {
            this.recargarRaices();
            this.cargando = false;
          },
          error: (err: HttpErrorResponse) => {
            this.cargando = false;
            this.mensajesService.errorHttp(err);
          }
        });
        break;
      case 'nuevoNodo':
        this.adminService.nuevoNodo(this.nodoSeleccionado$.value!.data!.Id, descripcion).subscribe({
          next: () => {
            this.cargaDescendientes(this.nodoSeleccionado$.value!);
            this.cargando = false;
          },
          error: (err: HttpErrorResponse) => {
            this.cargando = false;
            this.mensajesService.errorHttp(err);
          }
        });
        break;
      case 'editar':
        this.adminService.editarNodo(this.nodoSeleccionado$.value!.data!.Id, descripcion).subscribe({
          next: () => {
            this.nodoSeleccionado$.value!.label = descripcion;
            this.nodoSeleccionado$.next(this.nodoSeleccionado$.value!);
            //this.cargaDescendientes(this.nodoSeleccionado$.value!);
            this.cargando = false;
          },
          error: (err: HttpErrorResponse) => {
            this.cargando = false;
            this.mensajesService.errorHttp(err);
          }
        });
        break;
    }
    this.arbolOperacionReset();
  }

  borrarNodos(id: number) {
    this.cargando = true;
    this.adminService.borrarNodos(id).subscribe({
      next: () => {
        this.recargarRaices();
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        this.cargando = false;
        this.mensajesService.errorHttp(err);
      }
    });
  }


  arbolMenu() {

  }

  defineMenuArbol() {
    this.items = [
      {
        tooltipOptions: {
          tooltipLabel: 'Editar'
        },
        icon: 'pi pi-pencil',
        command: () => {
          this.descripcionNodoVentana = this.nodoSeleccionado$.value!.label!;
          this.arbolOperacionEditar();
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Recargar'
        },
        icon: 'pi pi-refresh',
        command: () => {
          this.recargarRaices();

        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Borrar'
        },
        icon: 'pi pi-trash',
        command: () => {
          if (confirm('¿Seguro que desea eliminar el nodo seleccionado?')) {
            this.borrarNodos(this.nodoSeleccionado$.value!.data!.Id);
          }
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Nueva raiz'
        },
        icon: 'pi pi-reply',
        command: () => {
          this.arbolOperacionNuevoNodoRaiz();
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Nuevo nodo'
        },
        icon: 'pi pi-arrow-down-right',
        command: () => {
          this.arbolOperacionNuevoNodo();
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      }
    ];
  }
}
