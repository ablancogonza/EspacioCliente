import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class MensajesService {

  mensaje$: Subject<Message> = new Subject<Message>();

  errorHttp(error: HttpErrorResponse) {
    this.mensaje$.next({ severity: 'error', summary: 'Error', detail: error.message });
  }

  error(mensaje: string) {
    this.mensaje$.next({ severity: 'error', summary: 'Error', detail: mensaje });
  }

  ok(mensaje: string) {
    this.mensaje$.next({ severity: 'success', summary: 'Correcto', detail: mensaje });
  }
}
