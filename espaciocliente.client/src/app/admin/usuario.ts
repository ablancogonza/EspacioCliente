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
  arbolOperacion: 'nuevoUsuario' | 'nuevoNodo' | 'editar' | undefined = undefined;
  tituloVentanaNodo: string = '';
  visibleVentanaNodo: boolean = false;
  nombre: string = '';
  login: string = '';
  rol: number = 2;
  items: MenuItem[] | null = [];
  cargando = false;
  usuarios: UsuarioDto[] = [];
  readonly roles = [{ label: 'admin', value: 0 }, { label: 'gestor', value: 1 }, { label: 'cliente', value: 2 }];

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

  operacionNuevoUsuario() {
    this.tituloVentanaNodo = 'Nuevo usuario';
    this.arbolOperacion = 'nuevoUsuario';
    this.visibleVentanaNodo = true;
  }

  operacionNuevoNodo() {
    //this.tituloVentanaNodo = 'Nuevo nodo';
    //this.arbolOperacion = 'nuevoNodo';
    //this.visibleVentanaNodo = true;
  }

  operacionEditar() {
    this.tituloVentanaNodo = 'Editar usuario';
    this.arbolOperacion = 'editar';
    this.nombre = this.nodoSeleccionado$.value!.data.Nombre;
    this.login = this.nodoSeleccionado$.value!.data.Login;
    this.rol = this.nodoSeleccionado$.value!.data.IdRol;    
    this.visibleVentanaNodo = true;
  }

  operacionReset() {
    this.tituloVentanaNodo = '';
    this.arbolOperacion = undefined;
    this.visibleVentanaNodo = false;
    this.nombre = '';
    this.login = '';
    this.rol = 2;
    this.nodoSeleccionado$.next({});
  }

  guardar() {
    this.cargando = true;
    this.visibleVentanaNodo = false;
    
    switch (this.arbolOperacion) {
      case 'nuevoUsuario':
        this.adminService.guardarUsuario(undefined, this.nombre, this.login, this.rol).subscribe({
          next: () => {
            this.operacionReset();
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
        //this.adminService.nuevoNodo(this.nodoSeleccionado$.value!.data!.Id, descripcion).subscribe({
        //  next: () => {
        //    this.cargaDescendientes(this.nodoSeleccionado$.value!);
        //    this.cargando = false;
        //  },
        //  error: (err: HttpErrorResponse) => {
        //    this.cargando = false;
        //    this.mensajesService.errorHttp(err);
        //  }
        //});
        break;
      case 'editar':
        this.adminService.guardarUsuario(this.nodoSeleccionado$.value!.data!.Id, this.nombre, this.login, this.rol).subscribe({
          next: () => {
            this.operacionReset();
            this.recargarRaices();            
            this.cargando = false;
          },
          error: (err: HttpErrorResponse) => {
            this.cargando = false;
            this.mensajesService.errorHttp(err);
          }
        });
        break;
    }
    this.operacionReset();
  }

  borrarNodos(id: number) {
    this.cargando = true;
    const idUsuario = parseInt(this.nodoSeleccionado$.value.parent?.key!);
    this.adminService.usuarioDelNodo(idUsuario, id).subscribe({
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

  borrarUsuario(id: number) {
    this.cargando = true;
    this.adminService.borrarUsuario(id).subscribe({
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
          tooltipLabel: 'Editar',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-user-edit',
        command: () => {
          this.nombre = this.nodoSeleccionado$.value!.data!.nombre;
          this.login = this.nodoSeleccionado$.value!.data!.login;
          this.rol = this.nodoSeleccionado$.value!.data!.rol
          this.operacionEditar();
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Recargar',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-refresh',
        command: () => {
          this.recargarRaices();

        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Borrar',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-user-minus',
        command: () => {
          if (confirm('¿Seguro que desea eliminar el usuario seleccionado?')) {
            this.borrarUsuario(this.nodoSeleccionado$.value!.data!.Id);
          }
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Nuevo usuario',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-user-plus',
        command: () => {
          this.operacionNuevoUsuario();
        }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Asignar nodo',
          tooltipPosition: 'left'
        },
        icon: 'pi pi-folder-plus',
        command: () => {
          this.operacionNuevoNodo();
        },
        disabled: !this.nodoSeleccionado$.value || !this.nodoSeleccionado$.value.data || this.nodoSeleccionado$.value?.data.IdRol === 0
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
