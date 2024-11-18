import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { EstadoService } from '../../shared/estado/estado.service';
import { Briefing } from '../briefing';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detalle-briefing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputNumberModule, InputTextModule, CalendarModule, ButtonModule ],
  templateUrl: './detalle-briefing.component.html',
  styleUrl: './detalle-briefing.component.css'
})
export class DetalleBriefingComponent {
  @Input() id: number | undefined = undefined;
  briefingForm: FormGroup;
  briefing: Briefing;

  constructor(private estadoService: EstadoService) {
    this.briefing = estadoService.briefing;
    this.briefingForm = new FormGroup({
      descripcion: new FormControl(''),
      presupuesto: new FormControl(0),
      inicio: new FormControl(new Date()),
      fin: new FormControl(new Date()),
      medio: new FormControl(''),
    });
  }
}
