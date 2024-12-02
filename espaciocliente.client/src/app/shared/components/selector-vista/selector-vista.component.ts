import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VistaSeleccionada } from '../../enumerados/vista-seleccionada';
import { Observable } from 'rxjs';
import { EstadoService } from '../../estado/estado.service';

@Component({
  selector: 'app-selector-vista',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './selector-vista.component.html',
  styleUrl: './selector-vista.component.css'
})
export class SelectorVistaComponent {

  visibles: number[] = Object.values(VistaSeleccionada).filter(r => typeof r === 'number') as number[];
  seleccionado: Observable<VistaSeleccionada>;
  nivelNodo = 0;

  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    estadoService.dispositivoMovil$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(p => this.cambiaDispositivo(p));
    this.seleccionado = estadoService.selectorVista.vista$;
    estadoService.arbol.nodoSeleccionado$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(n => {
        this.nivelNodo = n?.data?.IdTipoNodo ?? 0;
        if (this.estadoService.selectorVista.vista$.value === VistaSeleccionada.briefing &&
          this.nivelNodo > 5) {
          this.estadoService.selectorVista.vista$.next(VistaSeleccionada.incidencias);
        }
      });
  }

  selecciona(id: VistaSeleccionada): void {
    this.estadoService.selectorVista.vista$.next(id);    
  }

  cambiaDispositivo(movil: boolean) {
    if (!movil && this.estadoService.selectorVista.vista$.value === VistaSeleccionada.arbol) {
      this.estadoService.selectorVista.vista$.next(VistaSeleccionada.grafico);
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
