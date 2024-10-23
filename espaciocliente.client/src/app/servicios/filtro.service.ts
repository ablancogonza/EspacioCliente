import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementoFiltroDto } from '../dtos/elemento-filtro-dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private http: HttpClient) { }  

  filtro(): Observable<ElementoFiltroDto[]> {
    return this.http.get<ElementoFiltroDto[]>(environment.baseUrl + '/filtro/elementos');      
  }
}
