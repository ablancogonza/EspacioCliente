import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

}

export interface Nodo {
  Id: number;
  IdNodoPadre: number | undefined;
  Descripcion: string;
  IdTipoNodo: number;
}
