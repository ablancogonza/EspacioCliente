import { CommonModule } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VistaSeleccionada } from '../../enumerados/vista-seleccionada';
import { Observable } from 'rxjs';
import { EstadoService } from '../../estado/estado.service';
import { IncidenciasPendientes } from '../../dtos/incidencias-pendientes';
import { TreeNode } from 'primeng/api';
import { ListaCampaniasComponent } from '../lista-campanias/lista-campanias.component';

@Component({
  selector: 'app-selector-vista',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './selector-vista.component.html',
  styleUrl: './selector-vista.component.css',
  providers: [DialogService]
})
export class SelectorVistaComponent {
  VistaSeleccionada = VistaSeleccionada;
  visibles: number[] = Object.values(VistaSeleccionada).filter(r => typeof r === 'number') as number[];
  seleccionado: Observable<VistaSeleccionada>;
  incidenciasNoLeidas = signal<IncidenciasPendientes[]>([]);
  nodoSeleccionado: TreeNode<any> | undefined = undefined;
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService, private estadoService: EstadoService, private destroyRef: DestroyRef) {
    estadoService.dispositivoMovil$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.cambiaDispositivo(p));

    this.seleccionado = estadoService.selectorVista.vista$;

    estadoService.arbol.nodoSeleccionado$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(n => {
        this.nodoSeleccionado = n;        
      });

    estadoService.incidencias.noLeidos$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (lista: IncidenciasPendientes[]) => {
          this.incidenciasNoLeidas.set(lista);
        }
      })
  }

  selecciona(vista: VistaSeleccionada): void {
   
    if (vista === VistaSeleccionada.incidencias &&
      this.incidenciasNoLeidas().length > 0 &&
      (this.incidenciasNoLeidas().length !== 1 ||
      this.incidenciasNoLeidas()[0].Id !== this.nodoSeleccionado?.data.Id
      )
    ) {
      this.ref = this.dialogService.open(ListaCampaniasComponent, { header: 'Seleccione campaña' });

      this.ref.onClose.subscribe((id: number) => {                
        if (this.nodoSeleccionado && this.nodoSeleccionado.key === id.toString()) {
          
        } else {
          const des = this.incidenciasNoLeidas().find(i => i.Id === id)?.Descripcion;
          this.estadoService.filtro.establecerFiltroCampania(id, des??'');
          console.log('seleccionado: ', id);
        }
        this.estadoService.selectorVista.vista$.next(VistaSeleccionada.incidencias);
      });
    } else {
      this.estadoService.selectorVista.vista$.next(vista);
    }
  }

  cambiaDispositivo(movil: boolean) {
    if (!movil && this.estadoService.selectorVista.vista$.value === VistaSeleccionada.arbol) {
      this.estadoService.selectorVista.vista$.next(VistaSeleccionada.grafico);
    }
    if (movil && !this.estadoService.arbol.nodoSeleccionado$.value?.data) {
      this.estadoService.selectorVista.vista$.next(VistaSeleccionada.arbol);
    }
    this.visibles = movil ? Object.values(VistaSeleccionada).filter(r => typeof r === 'number') as number[] :
      Object.values(VistaSeleccionada).filter(r => typeof r === 'number' && r !== VistaSeleccionada.arbol) as number[];
  }

  icono(i: number): string {
    switch (i) {
      case VistaSeleccionada.arbol:
        return 'pi pi-folder-open';
      case VistaSeleccionada.grafico:
        return 'pi pi-chart-pie';
      case VistaSeleccionada.mapa:
        return 'pi pi-compass';
      case VistaSeleccionada.incidencias:
        return 'pi pi-envelope';
      case VistaSeleccionada.briefing:
        return 'pi pi-book';
      default:
        return '';
    }
  }

  title(i: number): string {
    switch (i) {
      case VistaSeleccionada.arbol:
        return 'Árbol de cliente';
      case VistaSeleccionada.grafico:
        return 'Gráficos';
      case VistaSeleccionada.mapa:
        return 'Mapa';
      case VistaSeleccionada.incidencias:
        return 'Incidencias';
      case VistaSeleccionada.briefing:
        return 'Briefing';
      default:
        return '';
    }
  }
}
