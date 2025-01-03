import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { ListaBriefingComponent } from '../lista-briefing/lista-briefing.component';
import { EstadoService } from '../../shared/estado/estado.service';
import { Briefing } from '../briefing';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { BriefingAdjuntosComponent } from '../briefing-adjuntos/briefing-adjuntos.component';
import { NuevoBriefingComponent } from '../nuevo-briefing/nuevo-briefing.component';
import { SeleccioneNodoComponent } from '../../shared/components/seleccione-nodo/seleccione-nodo.component';

@Component({
  selector: 'app-briefing',
  standalone: true,
  imports: [CommonModule, ListaBriefingComponent, NuevoBriefingComponent, BriefingAdjuntosComponent, SeleccioneNodoComponent],
  templateUrl: './briefing.component.html',
  styleUrl: './briefing.component.css'
})
export class BriefingComponent {
  briefing: Briefing;
  constructor(private estadoService: EstadoService, private destroyRef: DestroyRef) {
    this.briefing = estadoService.briefing;

    this.estadoService.arbol.nodoSeleccionado$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (seleccionado: TreeNode) => {
          this.briefing.setNodo(seleccionado);
        }
      });
  }
}
