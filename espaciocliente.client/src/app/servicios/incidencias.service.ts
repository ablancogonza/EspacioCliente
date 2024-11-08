import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(private http: HttpClient) { }

  crear(idNodo: number, titulo: string): Observable<Incidencia> {
    const data = {
      IdNodo: idNodo, 
      Titulo: titulo
    };
    return this.http.post<Incidencia>(`${environment.baseUrl}/incidencias/crear`, data);
  }

}

export interface Incidencia {
  id: number,
  des: string,
  usuario: string,
  titulo: string,
  fecha: Date,
  finalizado: boolean
}
