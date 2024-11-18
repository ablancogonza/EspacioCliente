import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListaBriefingComponent } from '../lista-briefing/lista-briefing.component';
import { EstadoService } from '../../shared/estado/estado.service';
import { Briefing } from '../briefing';
import { DetalleBriefingComponent } from '../detalle-briefing/detalle-briefing.component';

@Component({
  selector: 'app-briefing',
  standalone: true,
  imports: [CommonModule, ListaBriefingComponent, DetalleBriefingComponent],
  templateUrl: './briefing.component.html',
  styleUrl: './briefing.component.css'
})
export class BriefingComponent {
  briefing: Briefing;
  constructor(private estadoService: EstadoService) {
    this.briefing = estadoService.briefing;

  }
}
