import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private http: HttpClient) { }

  vallas(idNodo: number, inicio: number, fin: number): Observable<Valla[]> {
    return this.http.get<Valla[]>(`${environment.baseUrl}/mapa/marcas/${idNodo}/${inicio}/${fin}`);
  }
}

export interface Valla {
  id: number,
  lat: string,
  lon: string,
  des: string
}
