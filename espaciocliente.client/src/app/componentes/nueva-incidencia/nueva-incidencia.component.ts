import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-nueva-incidencia',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './nueva-incidencia.component.html',
  styleUrl: './nueva-incidencia.component.css'
})
export class NuevaIncidenciaComponent {

}
