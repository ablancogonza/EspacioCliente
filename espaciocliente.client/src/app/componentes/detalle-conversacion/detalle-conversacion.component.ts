import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, ViewChild } from '@angular/core';
import { IncidenciaComponent } from '../incidencia/incidencia.component';
import { EstadoService } from '../../servicios/estado.service';
import { Incidencias } from '../../estado/incidencias';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-detalle-conversacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, IncidenciaComponent, MensajeComponent],
  templateUrl: './detalle-conversacion.component.html',
  styleUrl: './detalle-conversacion.component.css'
})
export class DetalleConversacionComponent implements AfterViewInit {
  @ViewChild('divscroll', { static: true }) divscroll?: ElementRef;
  incidencias: Incidencias;
  texto: string = '';
  constructor(private estadoService: EstadoService, private mensajeService: MensajesService, private destroyRef: DestroyRef) {
    this.incidencias = estadoService.incidencias;
    this.incidencias.actualizarScroll$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: () => {
          setTimeout(() => { this.scrollToBottom(); }, 100);
        }
      })
      
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.scrollToBottom(); }, 100);
  }

  scrollToBottom(): void {
    const container = this.divscroll!.nativeElement;   
    container.scrollTop = container.scrollHeight;    
  }

  volver() {
    this.incidencias.vista.set('lista');
  }

  publicar() {
    this.incidencias.publicar(this.texto);
  }

  noimplementado() {
    this.mensajeService.info('Todavía no está implementado');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && this.texto) {
      this.publicar();
    }
  }
}
