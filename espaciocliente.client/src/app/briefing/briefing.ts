import { TreeNode } from "primeng/api";
import { BriefingDto } from "../shared/dtos/briefing-dto";
import { Medios } from "../shared/utils/medios";
import { BriefingService } from "./briefing.service";
import { signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { BriefingAdjuntoDto } from "../shared/dtos/briefing-adjunto-dto";
import { BriefingFicheroAdjunto } from "../shared/dtos/briefing-fichero-adjunto";

export class Briefing {

  vista = signal<string>('lista');
  medios = Medios.medios().filter(f => f.Id < 20);
  activo: TreeNode<any> | undefined = undefined;
  lista = signal<BriefingDto[]>([]);
  entrada: BriefingDto | undefined = undefined;
  listaAdjuntos = signal<BriefingAdjuntoDto[]>([]);

  constructor(private briefingService: BriefingService) { }

  setNodo(seleccionado: TreeNode<any>) {
    console.log('setNodo briefing: ', seleccionado);
    if (seleccionado && seleccionado.data && seleccionado !== this.activo) {
      this.activo = seleccionado;
      this.recargaLista();
    }
  }
    
  nuevo() {
    this.vista.set('detalle');
  }

  crear(briefing: BriefingDto) {
    console.log('crear briefing', briefing);
    this.briefingService.crearBriefing(briefing).subscribe({
      next: (briefing: BriefingDto[]) => {
        this.adjuntos(briefing[0]);        
      }
    });
  }

  recargaLista() {
    this.briefingService.recuperarBriefing(this.activo?.data.Id).subscribe({
      next: (lista: BriefingDto[]) => {
        console.log('carga lista briefing: ', lista);
        this.lista.set(lista);
      }
    })
  }

  adjuntos(e: BriefingDto) {
    this.entrada = e;
    this.vista.set('adjuntos');
    this.recuperarAdjuntos();
  }

  recuperarAdjuntos() {
    console.log('entrada: ', this.entrada);
    this.briefingService.recuperarAdjuntos(this.entrada!.Id!).subscribe({
      next: (lista: BriefingAdjuntoDto[]) => {
        this.listaAdjuntos.set(lista);        
      }
    })
  }

  download(id?: number) {
    if (!id) return;

    this.briefingService.descargar(id).subscribe({
      next: (ficheros: BriefingFicheroAdjunto[]) => {
        console.log('ficheros: ', ficheros);
        const fichero = ficheros[0];
       
        const downloadLink = document.createElement('a');
        const fileName = `${fichero.Descripcion}${fichero.Extension}`;
        const linkSource = `data:application/octet-stream;base64,${fichero.Contenido}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });    
  };

  nodoEjercicio(): boolean {
    console.log('nodoEjercicio: ', this.activo);
    if (!this.activo || !this.activo.data?.IdTipoNodo) return false;
    return this.activo.data.IdTipoNodo === 5;
  }

}
