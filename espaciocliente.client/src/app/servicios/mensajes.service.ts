import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class MensajesService {

  mensaje$: Subject<Message> = new Subject<Message>();
  
  error(mensaje: string) {
    this.mensaje$.next({ severity: 'error', summary: 'Error', detail: mensaje });
  }

}
