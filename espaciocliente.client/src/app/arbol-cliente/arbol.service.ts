import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Nodo } from './nodo';

@Injectable({
  providedIn: 'root'
})
export class ArbolService {
 
  constructor(private http: HttpClient) { }

  raiz(): Observable<Nodo[]> {
    return this.http.get<Nodo[]>(`${environment.baseUrl}/arbol/raizArbol`);
  }

  descendientes(id: string): Observable<Nodo[]> {
    return this.http.get<Nodo[]>(`${environment.baseUrl}/arbol/nodosArbol?id=${id}`);
  }

  desdeNodo(id: number) {
    return this.http.get<Nodo[]>(`${environment.baseUrl}/arbol/nodoFiltrado?id=${id}`);
  }

}


