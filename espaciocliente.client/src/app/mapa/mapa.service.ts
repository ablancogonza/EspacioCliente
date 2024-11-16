import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InfoValla } from './info-valla';
import { Valla } from './valla';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private http: HttpClient) { }

  vallas(idNodo: number, inicio: number, fin: number): Observable<Valla[]> {
    return this.http.get<Valla[]>(`${environment.baseUrl}/mapa/marcas/${idNodo}/${inicio}/${fin}`);
  }

  infoValla(idNodo: number, inicio: number, fin: number, idValla: number): Observable<InfoValla[]> {
    return this.http.get<InfoValla[]>(`${environment.baseUrl}/mapa/info/${idNodo}/${inicio}/${fin}/${idValla}`);
  }
}




