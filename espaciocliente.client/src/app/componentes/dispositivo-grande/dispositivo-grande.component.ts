import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-dispositivo-grande',
  standalone: true,
  imports: [CommonModule, SplitterModule],
  templateUrl: './dispositivo-grande.component.html',
  styleUrl: './dispositivo-grande.component.css'
})
export class DispositivoGrandeComponent {

}
