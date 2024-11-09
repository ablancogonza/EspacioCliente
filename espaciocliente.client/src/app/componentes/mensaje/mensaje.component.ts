import { Component, Input } from '@angular/core';
import { EntradaMensaje } from '../../estado/incidencias';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
  @Input() mensaje?: EntradaMensaje;
}
