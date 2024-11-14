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

  infoValla(idNodo: number, inicio: number, fin: number, idValla: number): Observable<InfoValla[]> {
    return this.http.get<InfoValla[]>(`${environment.baseUrl}/mapa/info/${idNodo}/${inicio}/${fin}/${idValla}`);
  }
}

export interface Valla {
  id: number,
  lat: string,
  lon: string,
  des: string,
  pos?: any
}

export interface InfoValla {
  impAnual?: number,
  impPeriodo?: number,
  impProdFij?: number,
  fechaUltCambio?: Date,
  fechaFinContrato?: Date,
  valoracionQualy?: number,
  puntuacion?: number,
  impactos?: number,
  individuos?: number,
  imagen?: string
}
