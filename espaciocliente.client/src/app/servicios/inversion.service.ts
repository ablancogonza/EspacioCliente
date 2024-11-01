import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FiltroActivo } from '../estado/filtro';

@Injectable({
  providedIn: 'root'
})
export class InversionService {

  constructor(private http: HttpClient) { }

  inversion(f: FiltroActivo): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/inversion/inversion?id=${f.id}&inicio=${f.inicio}&fin=${f.fin}`);
  }

  inversionMedio(f: FiltroActivo): Observable<InversionMedio[]> {
    return this.http.get<InversionMedio[]>(`${environment.baseUrl}/inversion/inversionMedio?id=${f.id}&inicio=${f.inicio}&fin=${f.fin}`);
  }
}

export interface InversionMedio {
  Medio: string,
  Inversion: number
}
