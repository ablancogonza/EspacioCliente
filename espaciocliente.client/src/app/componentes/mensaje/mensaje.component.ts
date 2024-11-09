import { Component, Input } from '@angular/core';
import { EntradaMensaje } from '../../estado/incidencias';
import { CommonModule } from '@angular/common';
import { TipoEntradaMensaje } from '../../enumerados/tipo-entrada-mensaje';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
  TipoEntradaMensaje = TipoEntradaMensaje;
  @Input() mensaje?: EntradaMensaje;
}
