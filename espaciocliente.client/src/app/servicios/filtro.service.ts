import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementoFiltroDto } from '../dtos/elemento-filtro-dto';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { KeyValueDto } from '../dtos/key-value-dto';
import { Nodo } from './arbol.service';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private http: HttpClient) { }  

  elementosFiltro(): Observable<ElementoFiltroDto[]> {
    return this.http.get<ElementoFiltroDto[]>(environment.baseUrl + '/filtro/elementosFiltro');      
  }

  buscar(nivel: number, texto: string): Observable<Nodo[]> {
    console.log(`buscar(${nivel},${texto})`);    
    return this.http.get<Nodo[]>(`${environment.baseUrl}/filtro/buscar?nivel=${nivel}&texto=${texto}`);
  }
}
