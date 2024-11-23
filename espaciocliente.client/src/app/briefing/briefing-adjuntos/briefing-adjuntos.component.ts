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
import { BriefingAdjuntoDetalleComponent } from '../briefing-adjunto-detalle/briefing-adjunto-detalle.component';
import { MensajesService } from '../../shared/servicios/mensajes.service';

@Component({
  selector: 'app-briefing-adjuntos',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, FileUploadModule,
    DetalleBriefingComponent, BriefingAdjuntoDetalleComponent],
  templateUrl: './briefing-adjuntos.component.html',
  styleUrl: './briefing-adjuntos.component.css'
})
export class BriefingAdjuntosComponent {
  briefing: Briefing;
  descripcion: string = '';

  constructor(private estadoService: EstadoService, private mensajeService: MensajesService) {
    this.briefing = estadoService.briefing;
  }

  onUpload(event: UploadEvent) {
    console.log('onFileUpload: ', event);
    this.descripcion = '';
    this.briefing.recuperarAdjuntos();    
  }

  errorEnUpload(event: FileUploadErrorEvent) {    
    console.log('error file upload: ', event);
    this.mensajeService.error('Se ha producido un error al subir el fichero');
  }

  url(): string {        
    return `${environment.baseUrl}/briefing/upload/${this.briefing.entrada?.Id}/${this.descripcion}`;
  }

  
}
