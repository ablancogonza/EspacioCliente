import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Briefing } from '../briefing';
import { EstadoService } from '../../shared/estado/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { DetalleBriefingComponent } from '../detalle-briefing/detalle-briefing.component';

@Component({
  selector: 'app-lista-briefing',
  standalone: true,
  imports: [CommonModule, ButtonModule, DetalleBriefingComponent],
  templateUrl: './lista-briefing.component.html',
  styleUrl: './lista-briefing.component.css'
})
export class ListaBriefingComponent {
  briefing!: Briefing;

  constructor(private estadoService: EstadoService) {
    this.briefing = estadoService.briefing;

    
  }
}
