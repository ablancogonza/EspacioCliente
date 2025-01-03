import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ElementoFiltroDto } from "./elemento-filtro-dto";
import { environment } from "../../environments/environment";
import { Nodo } from "../arbol-cliente/nodo";

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private http: HttpClient) { }

  elementosFiltro(): Observable<ElementoFiltroDto[]> {
    return this.http.get<ElementoFiltroDto[]>(environment.baseUrl + '/filtro/elementosFiltro');
  }

  buscar(nivel: number, texto: string): Observable<Nodo[]> {    
    return this.http.get<Nodo[]>(`${environment.baseUrl}/filtro/buscar?nivel=${nivel}&texto=${texto}`);
  }
}
