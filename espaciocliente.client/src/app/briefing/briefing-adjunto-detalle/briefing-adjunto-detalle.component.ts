import { Component, Input } from '@angular/core';
import { BriefingAdjuntoDto } from '../../shared/dtos/briefing-adjunto-dto';

@Component({
  selector: 'app-briefing-adjunto-detalle',
  standalone: true,
  imports: [],
  templateUrl: './briefing-adjunto-detalle.component.html',
  styleUrl: './briefing-adjunto-detalle.component.css'
})
export class BriefingAdjuntoDetalleComponent {
  @Input() adjunto: BriefingAdjuntoDto | undefined;


}
