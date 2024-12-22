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
    switch (error.status) {
      case 401:
        this.mensaje$.next({ severity: 'secondary', summary: 'Sesiónm caducada', detail: 'Su sesión ha caducado. Deberá volver a iniciar sesión.' });
        break;
      default:
        this.mensaje$.next({ severity: 'danger', summary: 'Error', detail: 'Parece que no hay conexión' });
        break;
    }
  }

  error(mensaje: string) {
    this.mensaje$.next({ severity: 'danger', summary: 'Error', detail: mensaje });
  }

  ok(mensaje: string) {
    this.mensaje$.next({ severity: 'success', summary: 'Correcto', detail: mensaje });
  }

  info(mensaje: string) {
    this.mensaje$.next({ severity: 'info', summary: 'Atención', detail: mensaje });
  }


  warning(mensaje: string) {
    this.mensaje$.next({ severity: 'warning', summary: 'Atención', detail: mensaje });
  }
}
