import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { EstadoService } from '../../shared/estado/estado.service';
import { Briefing } from '../briefing';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FechaValidators } from '../../shared/validators/FechaValidators';
import { BriefingDto } from '../../shared/dtos/briefing-dto';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-nuevo-briefing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputNumberModule, InputTextModule, CalendarModule, ButtonModule ],
  templateUrl: './nuevo-briefing.component.html',
  styleUrl: './nuevo-briefing.component.css'
})
export class NuevoBriefingComponent {
  @Input() id: number | undefined = undefined;
  briefingForm: FormGroup;
  briefing: Briefing;

  descripcion: FormControl = new FormControl('', [Validators.required, Validators.maxLength(300)]);
  presupuesto: FormControl = new FormControl(0, [Validators.required]);
  inicio: FormControl = new FormControl(new Date(), [Validators.required]);
  fin: FormControl = new FormControl(new Date(), [Validators.required, FechaValidators.mayorIgualQue(this.inicio)]);
  medio: FormControl = new FormControl('', [Validators.required]);

  constructor(private estadoService: EstadoService) {
    this.briefing = estadoService.briefing;
    this.briefingForm = new FormGroup({
      descripcion: this.descripcion,
      presupuesto: this.presupuesto,
      inicio: this.inicio,
      fin: this.fin,
      medio: this.medio
    });
  }

  crear() {
    if (this.briefingForm.valid) {
      const data: BriefingDto = {
        IdNodo: this.estadoService.arbol.nodoSeleccionado$.value.data.Id,
        Descripcion: this.descripcion.value,
        Presupuesto: this.presupuesto.value,
        Inicio: this.inicio.value,
        Fin: this.fin.value,
        Medio: this.medio.value.Id,        
      };
      const nodo: TreeNode = this.estadoService.arbol.nodoSeleccionado$.value;
      this.briefing.crear(data);
    }
  }
}
