import { Component, Input } from '@angular/core';
import { BriefingDto } from '../../shared/dtos/briefing-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-briefing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-briefing.component.html',
  styleUrl: './detalle-briefing.component.css'
})
export class DetalleBriefingComponent {
  @Input() entrada: BriefingDto | undefined = undefined;
  @Input() seleccionable: boolean = true;
}
