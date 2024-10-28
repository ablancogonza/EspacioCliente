import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementoFiltro } from '../../../estado/filtro';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { KeyValueDto } from '../../../dtos/key-value-dto';
import { FiltroService } from '../../../servicios/filtro.service';
import { ElementoFiltroDto } from '../../../dtos/elemento-filtro-dto';
import { Nodo } from '../../../servicios/arbol.service';

@Component({
  selector: 'app-buscador-filtro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AutoCompleteModule, ButtonModule],
  templateUrl: './buscador-filtro.component.html',
  styleUrl: './buscador-filtro.component.css'
})
export class BuscadorFiltroComponent {
  @Input() buscador!: ElementoFiltro;
  @Output() buscadorModificado: EventEmitter<ElementoFiltro> = new EventEmitter();

  nuevaCadena$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  buscaCadena$!: Observable<Nodo[]>;
  
  resultados: string[] = [];

  constructor(private filtroService: FiltroService) {
    this.buscaCadena$ = this.nuevaCadena$.pipe(
      switchMap(cadena => this.filtroService.buscar(this.buscador.id, cadena))    
    );
  }

  formGroup: FormGroup = new FormGroup({
    buscador: new FormControl('')
  });

  buscar(a: AutoCompleteCompleteEvent) {

    console.log('buscar: ', a.query);
    this.buscaCadena$.subscribe({
      next: (r) => {
        console.log('Resultado buscar: ', r);
        this.buscador.coincidentes = [];
        r?.map(t => this.buscador.coincidentes.push({ key: t.Id, value: t.Descripcion }));
      }
    });
    this.nuevaCadena$.next(a.query);    
  }

  seleccionado(n: AutoCompleteSelectEvent) {
    this.buscador.seleccionado = n.value;
    console.log('Seleccionado: ', n.value);
  }

  limpiar() {
    this.buscador.seleccionado = undefined;
    this.formGroup.patchValue({
      buscador: ''
    });
  }
}
