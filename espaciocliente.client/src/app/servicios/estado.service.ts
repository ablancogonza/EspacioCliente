import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor() { }

  private token: string = '';

  getToken(): string { return this.token; }
  setToken(token: string) { this.token = token; };



}
