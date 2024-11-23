import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Briefing } from '../briefing';
import { EstadoService } from '../../shared/estado/estado.service';
import { DetalleBriefingComponent } from '../detalle-briefing/detalle-briefing.component';
import { FileUploadErrorEvent, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-briefing-adjuntos',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DetalleBriefingComponent, FileUploadModule],
  templateUrl: './briefing-adjuntos.component.html',
  styleUrl: './briefing-adjuntos.component.css'
})
export class BriefingAdjuntosComponent {
  briefing: Briefing;
  descripcion: string = '';

  constructor(private estadoService: EstadoService) {
    this.briefing = estadoService.briefing;
  }

  onUpload(event: UploadEvent) {
    console.log('onFileUpload: ', event);
    //const resp = event.originalEvent as HttpResponse<Mensaje[]>;
    //const msg = (resp.body as Mensaje[])[0];
    //this.incidencias.despuesDeImagenUpload(msg);
    //this.texto = '';
    //setTimeout(() => {
    //  this.scrollToBottom();
    //}, 100);
  }

  errorEnUpload(event: FileUploadErrorEvent) {
    //this.mensajeService.error('Error al subir la imagen');
    console.log('error file upload: ', event);
  }

  url(): string {        
    return `${environment.baseUrl}/briefing/upload/${this.briefing.activo?.data.Id}/${this.descripcion}`;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && this.descripcion) {
      //this.publicar();
    }
  }
}
