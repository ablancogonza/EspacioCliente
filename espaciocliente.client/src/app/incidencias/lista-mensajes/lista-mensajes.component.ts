import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Incidencias } from '../incidencias';
import { EstadoService } from '../../shared/estado/estado.service';
import { MensajesService } from '../../shared/servicios/mensajes.service';
import { Incidencia } from '../incidencia';
import { IncidenciasDetalleComponent } from '../incidencias-detalle/incidencias-detalle.component';
import { FileUploadErrorEvent, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import { Mensaje } from '../mensaje';

@Component({
  selector: 'app-lista-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule,  FileUploadModule,
    IncidenciasDetalleComponent, MensajeComponent],
  templateUrl: './lista-mensajes.component.html',
  styleUrl: './lista-mensajes.component.css'
})
export class ListaMensajesComponent implements AfterViewInit {
  @ViewChild('divscroll', { static: true }) divscroll?: ElementRef;
  incidencias: Incidencias;
  texto: string = '';
  
  constructor(private estadoService: EstadoService,
    private mensajeService: MensajesService,
    private destroyRef: DestroyRef) {
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

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && this.texto) {
      this.publicar();
    }
  }

  onSend() {
    this.incidencias.procesando.set(true);
  }

  onUpload(event: UploadEvent) {
    const resp = event.originalEvent as HttpResponse<Mensaje[]>;    
    const msg = (resp.body as Mensaje[])[0];    
    this.incidencias.despuesDeImagenUpload(msg);
    this.texto = '';
    setTimeout(() => {
      this.scrollToBottom();      
    }, 100);    
  }

  errorEnUpload(event: FileUploadErrorEvent) {
    this.mensajeService.error('Error al subir la imagen');
  }

  finalizar(inc: Incidencia) {
    console.log('finalizar: ', inc);
    this.estadoService.incidencias.finalizar(inc.id);
    console.log('después de finalizar');
    this.volver();
  }

  url(): string {
    let txt = this.texto;
    if (!txt || txt.length === 0) txt = 'SINTEXTO';
    return `${environment.baseUrl}/incidencia/upload/${this.incidencias.seleccionada!.id}/${txt}`;
  }
}

