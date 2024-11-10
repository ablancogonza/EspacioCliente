import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InfoValla, MapaService, Valla } from '../../servicios/mapa.service';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { ProcesandoComponent } from '../procesando/procesando.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-valla',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule, ProcesandoComponent],
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
          this.imagen = `data:image/jpeg;base64,${this.info.imagen}`;
          this.cargando = false;          
        }
      });
    }
  }
}
