import { DestroyRef, signal } from "@angular/core";
import { TreeNode } from "primeng/api";
import { SelectButtonChangeEvent, SelectButtonOptionClickEvent } from "primeng/selectbutton";
import { Observable, Subject, Subscription, switchMap } from "rxjs";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { GraficosService, InversionData } from "./graficos.service";
import { FiltroFechas } from "../filtro/filtro-fechas";
import { EstadoService } from "../shared/estado/estado.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FiltroActivo } from "../filtro/filtro-activo";
import { HttpErrorResponse } from "@angular/common/http";


export class Grafico {
 
  nodoArbolSeleccionado?: TreeNode;
  filtroFechas?: FiltroFechas;
  data = signal<any>(undefined);
  options = signal<any>(undefined);
  tipo = signal<TipoGrafico>("pie");
  tipoGrafico = signal<number>(1);
  cargando = signal<boolean>(true);

  readonly tiposDeGraficos = [{ label: 'Medio', value: 1 }, { label: 'Descendientes', value: 2 }, { label: 'Temporal', value: 3 }];

  constructor(private graficosService: GraficosService, private mensajesService: MensajesService) { }
 
  sinNodoSeleccionado() {
    this.cargando.set(false);    
  }

  setNodo(n: TreeNode) {
    if (n && n.data) {
      this.nodoArbolSeleccionado = n;
      this.recalcularGrafico();
    } else {
      this.nodoArbolSeleccionado = undefined;
    }
  }

  fechasCambiadas(fechas: FiltroFechas) {
    this.filtroFechas = fechas;
    this.recalcularGrafico();
  }
  
  vistaSeleccionada(e: any) {
    this.tipoGrafico.set(e.value);
    this.recalcularGrafico();
  }

  private filtro(): FiltroActivo {
    return { id: parseInt(this.nodoArbolSeleccionado?.key!), inicio: this.filtroFechas?.inicio!, fin: this.filtroFechas?.fin! };
  }

  recalcularGrafico() {
    this.cargando.set(true);
    if (!this.filtroFechas || !this.nodoArbolSeleccionado || !this.nodoArbolSeleccionado.key) return;    
    const f = { id: parseInt(this.nodoArbolSeleccionado.key!), inicio: this.filtroFechas.inicio, fin: this.filtroFechas.fin };    
    this.recuperarDatosGrafico(f).subscribe({
      next: (data: InversionData[]) => {
        this.generarGrafico(data);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.mensajesService.errorHttp(err);
      }
    });
  }

  recuperarDatosGrafico(filtro: FiltroActivo): Observable<InversionData[]> {
    switch (this.tipoGrafico()) {      
      case 2:
        this.tipo.set("bar");
        return this.graficosService.inversionCampania(this.filtro());
      case 3:
        this.tipo.set("bar");
        return this.graficosService.inversionTemporal(this.filtro());
      default:
        this.tipo.set("pie");
        return this.graficosService.inversionMedio(this.filtro());
    }
  }

  generarGrafico(datos: InversionData[]) {
    const labels: string[] = datos?.map(r => r.Data);
    const data: number[] = datos?.map(r => r.Inversion);    
    this.data.set({
      labels: labels,
      datasets: [
        {
          label: 'Inversión',
          data: data          
        }
      ]
    });

    this.options.set({
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: 'black'
          }
        }
      }
    });    
  }
}

export type TipoGrafico = "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
