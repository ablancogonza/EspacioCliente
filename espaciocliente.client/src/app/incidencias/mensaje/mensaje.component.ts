import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { EntradaMensaje } from '../entrada-mensaje';
import { TipoEntradaMensaje } from '../../shared/enumerados/tipo-entrada-mensaje';


@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent implements OnChanges { 
  TipoEntradaMensaje = TipoEntradaMensaje;
  @Input() mensaje?: EntradaMensaje;
  imagen: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mensaje'] && changes['mensaje'].currentValue) {
      this.imagen = `data:image/jpeg;base64,${this.mensaje!.imagen}`;
    }
  }

}
