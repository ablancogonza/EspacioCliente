import { TreeNode } from "primeng/api";
import { BriefingDto } from "../shared/dtos/briefing-dto";
import { Medios } from "../shared/utils/medios";
import { BriefingService } from "./briefing.service";
import { signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { BriefingAdjuntoDto } from "../shared/dtos/briefing-adjunto-dto";
import { BriefingFicheroAdjunto } from "../shared/dtos/briefing-fichero-adjunto";
import { HttpErrorResponse } from "@angular/common/http";
import { MensajesService } from "../shared/servicios/mensajes.service";

export class Briefing {

  vista = signal<string>('lista');
  medios = Medios.medios().filter(f => f.Id < 20);
  activo: TreeNode<any> | undefined = undefined;
  lista = signal<BriefingDto[]>([]);
  entrada: BriefingDto | undefined = undefined;
  listaAdjuntos = signal<BriefingAdjuntoDto[]>([]);

  constructor(private briefingService: BriefingService, private mensajesService: MensajesService) { }

  setNodo(seleccionado: TreeNode<any>) {    
    if (seleccionado && seleccionado.data && seleccionado !== this.activo) {
      this.activo = seleccionado;
      this.recargaLista();
    }
  }
    
  nuevo() {
    this.vista.set('detalle');
  }

  crear(briefing: BriefingDto) {    
    this.briefingService.crearBriefing(briefing).subscribe({
      next: (briefing: BriefingDto[]) => {
        this.adjuntos(briefing[0]);        
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });
  }

  recargaLista() {
    this.briefingService.recuperarBriefing(this.activo?.data.Id).subscribe({
      next: (lista: BriefingDto[]) => {        
        this.lista.set(lista);
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    })
  }

  adjuntos(e: BriefingDto) {
    this.entrada = e;
    this.vista.set('adjuntos');
    this.recuperarAdjuntos();
  }

  recuperarAdjuntos() {   
    this.briefingService.recuperarAdjuntos(this.entrada!.Id!).subscribe({
      next: (lista: BriefingAdjuntoDto[]) => {
        this.listaAdjuntos.set(lista);        
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    })
  }

  download(id?: number) {
    if (!id) return;

    this.briefingService.descargar(id).subscribe({
      next: (ficheros: BriefingFicheroAdjunto[]) => {        
        const fichero = ficheros[0];       
        const downloadLink = document.createElement('a');
        const fileName = `${fichero.Descripcion}${fichero.Extension}`;
        const linkSource = `data:application/octet-stream;base64,${fichero.Contenido}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });    
  };

  nodoEjercicio(): boolean {    
    if (!this.activo || !this.activo.data?.IdTipoNodo) return false;
    return this.activo.data.IdTipoNodo === 5;
  }

}
