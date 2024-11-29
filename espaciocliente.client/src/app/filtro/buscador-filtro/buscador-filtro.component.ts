import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, Subject, switchMap } from 'rxjs';

import { Nodo } from '../../arbol-cliente/nodo';
import { FiltroService } from '../filtro.service';
import { ElementoFiltro } from '../elemento-filtro';
import { HttpErrorResponse } from '@angular/common/http';
import { MensajesService } from '../../shared/servicios/mensajes.service';


@Component({
  selector: 'app-buscador-filtro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AutoCompleteModule, ButtonModule],
  templateUrl: './buscador-filtro.component.html',
  styleUrl: './buscador-filtro.component.css'
})
export class BuscadorFiltroComponent implements OnChanges {
  @Input() buscador!: ElementoFiltro;
  @Output() buscadorModificado: EventEmitter<ElementoFiltro> = new EventEmitter();

  nuevaCadena$: Subject<string> = new Subject<string>();
  buscaCadena$!: Observable<Nodo[]>;  
  resultados: string[] = [];
  formGroup!: FormGroup;

  constructor(private filtroService: FiltroService, private mensajesService: MensajesService) {
    this.buscaCadena$ = this.nuevaCadena$.pipe(
      switchMap(cadena => this.filtroService.buscar(this.buscador.id, cadena))    
    );

    this.buscaCadena$.subscribe({
      next: (r) => {        
        this.buscador.coincidentes = [];
        r?.map(t => this.buscador.coincidentes.push({ key: t.Id, value: t.Descripcion }));
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['buscador'] && changes['buscador'].currentValue) {
      this.formGroup = new FormGroup({
        buscador: new FormControl({ value: this.buscador.seleccionado?.value??'', disabled: !this.buscador.activo })
      });
    }
  }

  buscar(a: AutoCompleteCompleteEvent) {    
    this.nuevaCadena$.next(a.query);    
  }

  seleccionado(n: AutoCompleteSelectEvent) {
    this.buscador.seleccionado = n.value;
    this.buscadorModificado.emit(this.buscador);
  }

  limpiar() {
    this.buscador.seleccionado = undefined;
    this.formGroup.patchValue({
      buscador: ''
    });
    this.buscadorModificado.emit(this.buscador);
  }
}
