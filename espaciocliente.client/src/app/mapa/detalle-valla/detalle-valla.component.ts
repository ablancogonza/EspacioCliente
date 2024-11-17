import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { InfoValla } from '../info-valla';
import { Valla } from '../valla';
import { MapaService } from '../mapa.service';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';

@Component({
  selector: 'app-detalle-valla',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule, CargandoComponent, ImageModule],
  templateUrl: './detalle-valla.component.html',
  styleUrl: './detalle-valla.component.css'
})
export class DetalleVallaComponent implements OnChanges {  
  @Input() valla?: Valla;
  @Input() idNodo?: number;
  @Input() inicio?: number;
  @Input() fin?: number;
  cargando = true;

  imagen?: string;
  info?: InfoValla;

  constructor(private mapaService: MapaService) { }

  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['valla'] && changes['valla'].currentValue) {
      this.mapaService.infoValla(this.idNodo!, this.inicio!, this.fin!, this.valla!.id).subscribe({
        next: (info) => {
          this.info = info[0];
          this.imagen = this.info?.imagen ? `data:image/jpeg;base64,${this.info.imagen}` : '';
          this.cargando = false;         
        }
      });
    }
  }
}
