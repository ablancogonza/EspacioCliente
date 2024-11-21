import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Briefing } from '../briefing';
import { EstadoService } from '../../shared/estado/estado.service';
import { DetalleBriefingComponent } from '../detalle-briefing/detalle-briefing.component';

@Component({
  selector: 'app-briefing-adjuntos',
  standalone: true,
  imports: [CommonModule, ButtonModule, DetalleBriefingComponent],
  templateUrl: './briefing-adjuntos.component.html',
  styleUrl: './briefing-adjuntos.component.css'
})
export class BriefingAdjuntosComponent {
  briefing: Briefing;

  constructor(private estadoService: EstadoService) {
    this.briefing = estadoService.briefing;
  }

}
