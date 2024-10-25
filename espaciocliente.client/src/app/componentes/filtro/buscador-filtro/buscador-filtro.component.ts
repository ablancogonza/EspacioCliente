import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementoFiltro } from '../../../estado/filtro';

@Component({
  selector: 'app-buscador-filtro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AutoCompleteModule, ButtonModule],
  templateUrl: './buscador-filtro.component.html',
  styleUrl: './buscador-filtro.component.css'
})
export class BuscadorFiltroComponent {
  @Input() buscador!: ElementoFiltro;
  
  resultados: string[] = [];

  formGroup: FormGroup = new FormGroup({
    buscador: new FormControl('')
  });

  buscar(a: AutoCompleteCompleteEvent) {

  }
}
