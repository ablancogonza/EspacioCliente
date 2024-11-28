import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FiltroActivo } from '../filtro/filtro-activo';



@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor(private http: HttpClient) { }

  inversionMedio(f: FiltroActivo): Observable<InversionData[]> {
    return this.http.get<InversionData[]>(`${environment.baseUrl}/inversion/inversionMedio?id=${f.id}&inicio=${f.inicio}&fin=${f.fin}`);
  }

  inversionCampania(f: FiltroActivo): Observable<InversionData[]> {
    return this.http.get<InversionData[]>(`${environment.baseUrl}/inversion/inversionCampania?id=${f.id}&inicio=${f.inicio}&fin=${f.fin}`);
  }

  inversionTemporal(f: FiltroActivo): Observable<InversionData[]> {
    return this.http.get<InversionData[]>(`${environment.baseUrl}/inversion/inversionTemporal?id=${f.id}&inicio=${f.inicio}&fin=${f.fin}`);
  }
}

export interface InversionData {
  Data: string,
  Inversion: number
}
