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
    return this.http.post<Incidencia>(`${environment.baseUrl}/incidencia/crear`, data);
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


}

export interface Incidencia {
  id: number,
  des: string,
  usuario: string,
  titulo: string,
  fecha: Date,
  finalizado: boolean
}

export interface Mensaje {
  id: number,
  fecha: Date,
  usuario: string,
  texto: string,  
  imagen: any
}
