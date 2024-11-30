import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Incidencia } from './incidencia';
import { Mensaje } from './mensaje';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(private http: HttpClient) { }

  crear(idNodo: number, titulo: string): Observable<Incidencia[]> {
    const data = {
      IdNodo: idNodo, 
      Titulo: titulo
    };
    return this.http.post<Incidencia[]>(`${environment.baseUrl}/incidencia/crear`, data);
  }

  recuperarIncidencias(idNodo: number): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${environment.baseUrl}/incidencia/lista/${idNodo}`);
  }

  recuperarMensajes(id: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${environment.baseUrl}/incidencia/mensajes/${id}`);
  }

  publicarMensaje(idIncidencia: number, texto: string): Observable<Mensaje[]> {
    const data = {
      IdIncidencia: idIncidencia,
      Texto: texto
    };
    return this.http.post<Mensaje[]>(`${environment.baseUrl}/incidencia/mensaje`, data);
  }

  finalizarIncidencia(idIncidencia: number, idNodo: number): Observable<Incidencia[]> {
    const data = {
      IdIncidencia: idIncidencia,
      IdNodo: idNodo
    };
    return this.http.post<Incidencia[]>(`${environment.baseUrl}/incidencia/finalizar`, data);
  }

  marcarLeidos(id: number, ultimo: number) {
    const data = {
      IdIncidencia: id,
      UltimoLeido: ultimo
    };
    return this.http.post<Incidencia[]>(`${environment.baseUrl}/incidencia/marcar`, data);
  }
}

