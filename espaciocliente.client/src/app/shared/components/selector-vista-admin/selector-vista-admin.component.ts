import { CommonModule } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EstadoService } from '../../estado/estado.service';
import { VistaSeleccionadaAdmin } from '../../enumerados/vista-seleccionada-admin';
import { Admin } from '../../../admin/admin';

@Component({
  selector: 'app-selector-vista-admin',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './selector-vista-admin.component.html',
  styleUrl: './selector-vista-admin.component.css',
  providers: [DialogService]
})
export class SelectorVistaAdminComponent {
  VistaSeleccionada = VistaSeleccionadaAdmin;
  visibles: number[] = Object.values(VistaSeleccionadaAdmin).filter(r => typeof r === 'number') as number[];  
  admin: Admin;
  
  //nodoSeleccionado: TreeNode<any> | undefined = undefined;
  ref: DynamicDialogRef | undefined;

  constructor(private estadoService: EstadoService) {
    this.admin = this.estadoService.admin;
    //estadoService.dispositivoMovil$
    //  .pipe(takeUntilDestroyed(this.destroyRef))
    //  .subscribe(p => this.cambiaDispositivo(p));

    //this.seleccionado = estadoService.selectorVista.vista$;

    //estadoService.arbol.nodoSeleccionado$
    //  .pipe(takeUntilDestroyed(this.destroyRef))
    //  .subscribe(n => {
    //    this.nodoSeleccionado = n;        
    //  });    
  }

  selecciona(vista: VistaSeleccionadaAdmin): void {
    this.admin.vistaSeleccionada.set(vista);
    
    //if (vista === VistaSeleccionadaAdmin.incidencias &&
    //  this.incidenciasNoLeidas()?.length > 0 &&
    //  (this.incidenciasNoLeidas()?.length !== 1 ||
    //  this.incidenciasNoLeidas()[0]?.Id !== this.nodoSeleccionado?.data.Id
    //  )
    //) {
    //  this.ref = this.dialogService.open(ListaCampaniasComponent, { header: 'Seleccione campaña' });

    //  this.ref.onClose.subscribe((id: number) => {                
    //    if (this.nodoSeleccionado && this.nodoSeleccionado.key === id.toString()) {
          
    //    } else {
    //      const des = this.incidenciasNoLeidas().find(i => i.Id === id)?.Descripcion;
    //      this.estadoService.filtro.establecerFiltroCampania(id, des??'');          
    //    }
    //    this.estadoService.selectorVista.vista$.next(VistaSeleccionada.incidencias);
    //  });
    //} else {      
    //  this.estadoService.selectorVista.vista$.next(vista);
    //}
  }

  cambiaDispositivo(movil: boolean) {
    //if (!movil && this.estadoService.selectorVista.vista$.value === VistaSeleccionada.arbol) {
    //  this.estadoService.selectorVista.vista$.next(VistaSeleccionada.grafico);
    //}
    //if (movil && !this.estadoService.arbol.nodoSeleccionado$.value?.data) {
    //  this.estadoService.selectorVista.vista$.next(VistaSeleccionada.arbol);
    //}
    //this.visibles = movil ? Object.values(VistaSeleccionada).filter(r => typeof r === 'number') as number[] :
    //  Object.values(VistaSeleccionada).filter(r => typeof r === 'number' && r !== VistaSeleccionada.arbol) as number[];
  }

  icono(i: number): string {
    switch (i) {
      case VistaSeleccionadaAdmin.arbol:
        return 'pi pi-folder-open';
      case VistaSeleccionadaAdmin.usuario:
        return 'pi pi-user';      
      default:
        return '';
    }
  }

  title(i: number): string {
    switch (i) {
      case VistaSeleccionadaAdmin.arbol:
        return 'Árbol de clientes';
      case VistaSeleccionadaAdmin.usuario:
        return 'Usuarios';      
      default:
        return '';
    }
  }
}
