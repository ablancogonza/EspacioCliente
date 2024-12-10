import { HttpErrorResponse } from "@angular/common/http";
import { signal } from "@angular/core";
import { TreeNode, MenuItem } from "primeng/api";
import { TreeNodeExpandEvent, TreeNodeSelectEvent } from "primeng/tree";
import { BehaviorSubject } from "rxjs";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { AdminService } from "./admin.service";
import { UsuarioDto } from "../shared/dtos/usuaio-dto";
import { NodoDto } from "../shared/dtos/nodo-dto";

export class Usuario {

  arbol = signal<TreeNode[]>([]);
  nodoSeleccionado$: BehaviorSubject<TreeNode> = new BehaviorSubject({});
  arbolOperacion: 'nuevaRaiz' | 'nuevoNodo' | 'editar' | undefined = undefined;
  tituloVentanaNodo: string = '';
  visibleVentanaNodo: boolean = false;
  descripcionNodoVentana: string = '';
  items: MenuItem[] | null = [];
  cargando = false;
  usuarios: UsuarioDto[] = [];

  constructor(private adminService: AdminService, private mensajesService: MensajesService) { }

  recargarRaices() {
    this.adminService.usuarios().subscribe({
      next: (usuarios: UsuarioDto[]) => {
        this.usuarios = usuarios;
        const raiz: TreeNode[] = [];
        usuarios?.forEach((nodo: UsuarioDto) => {
          raiz.push({
            key: nodo.Id.toString(),
            label: nodo.Login,
            children: [],
            data: nodo,
            leaf: false,
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
    this.adminService.usuarioNodos(parseInt(nodo.key!)).subscribe({
      next: (nodos: NodoDto[]) => {
        nodo.children = [];
        nodos?.forEach((nod: NodoDto) => {
          nodo.children!.push({
            key: nod.Id.toString(),
            label: nod.Descripcion,
            children: [],
            data: nod,
            leaf: true,
            loading: false
          });
        });
        nodo.loading = false;
        nodo.expanded = true;        
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

  defineMenuArbol() {
    console.log('defineMenuArbol', this.nodoSeleccionado$.value);
    if (this.nodoSeleccionado$.value && this.nodoSeleccionado$.value.data) {
      if (!this.nodoSeleccionado$.value.leaf) {
        this.defineMenuUsuario();
      } else {
        this.defineMenuNodo();
      }
    } else {
      this.defineMenuUsuario();
    }
  }

  defineMenuUsuario() {
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
          if (confirm('¿Seguro que desea eliminar el usuario seleccionado?')) {
            this.borrarNodos(this.nodoSeleccionado$.value!.data!.Id);
          }
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Nuevo usuario'
        },
        icon: 'pi pi-reply',
        command: () => {
          this.arbolOperacionNuevoNodoRaiz();
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Asignar nodo'
        },
        icon: 'pi pi-arrow-down-right',
        command: () => {
          this.arbolOperacionNuevoNodo();
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      }
    ];
  }

  defineMenuNodo() {
    this.items = [      
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
      }
    ];
  }
}
