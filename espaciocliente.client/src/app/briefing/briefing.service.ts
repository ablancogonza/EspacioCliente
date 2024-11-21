import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BriefingDto } from '../shared/dtos/briefing-dto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BriefingService {
  constructor(private http: HttpClient) { }

  crearBriefing(briefing: BriefingDto) {
    return this.http.post<any>(`${environment.baseUrl}/briefing/crear`, briefing);
  }

  recuperarBriefing(idNodo: number): Observable<BriefingDto[]> {
    return this.http.get<BriefingDto[]>(`${environment.baseUrl}/briefing/lista/${idNodo}`);
  }
}
