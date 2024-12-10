import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Nodo } from '../arbol-cliente/nodo';
import { UsuarioDto } from '../shared/dtos/usuaio-dto';
import { NodoDto } from '../shared/dtos/nodo-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  raices(): Observable<Nodo[]> {
    return this.http.get<Nodo[]>(`${environment.baseUrl}/admin/raicesArbol`);
  }

  descendientes(id: string): Observable<Nodo[]> {
    return this.http.get<Nodo[]>(`${environment.baseUrl}/admin/nodosArbol?id=${id}`);
  }

  nuevoNodo(idNodo: number | undefined, descripcion: string) {
    return this.http.post(`${environment.baseUrl}/admin/nuevoNodo`, { idNodo, descripcion });
  }

  editarNodo(idNodo: number, descripcion: string) {
    return this.http.post(`${environment.baseUrl}/admin/editarNodo`, { idNodo, descripcion });
  }

  borrarNodos(idNodo: number) {
    return this.http.delete(`${environment.baseUrl}/admin/borrarNodos/${idNodo}`);
  }

  usuarios(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(`${environment.baseUrl}/admin/usuarios`);
  }

  usuarioNodos(id: number): Observable<NodoDto[]> {
    return this.http.get<NodoDto[]>(`${environment.baseUrl}/admin/usuarioNodos/${id}`);
  }
}
