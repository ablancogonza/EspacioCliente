import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';

import { Fecha } from '../../shared/utils/fecha';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LogarithmicScale } from 'chart.js';
import { ConfirmationService } from 'primeng/api';
import { Incidencia } from '../incidencia';

@Component({
  selector: 'app-incidencias-detalle',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './incidencias-detalle.component.html',
  styleUrl: './incidencias-detalle.component.css',
  providers: [ConfirmationService]
})
export class IncidenciasDetalleComponent {
  formatoFechaHora = Fecha.fechaHora;
  @Input() incidencia?: Incidencia;
  @Input() seleccionable = true;
  @Output() seleccionada: EventEmitter<Incidencia> = new EventEmitter();
  @Output() finalizar: EventEmitter<Incidencia> = new EventEmitter();

  click() {
    this.seleccionada.emit(this.incidencia);
  }

  constructor(private confirmationService: ConfirmationService) { }

  confirmar(event: Event) {   
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Seguro que desea cerrar la incidencia?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",      
      accept: () => {        
        this.finalizar.emit(this.incidencia);
      },
      reject: () => {

      }
    });
  }  
}
