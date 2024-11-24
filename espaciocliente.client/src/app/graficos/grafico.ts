import { signal } from "@angular/core";
import { TreeNode } from "primeng/api";
import { SelectButtonChangeEvent, SelectButtonOptionClickEvent } from "primeng/selectbutton";
import { Observable, Subject, Subscription, switchMap } from "rxjs";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { FiltroActivo } from "../filtro/filtro-activo";
import { GraficosService, InversionData } from "./graficos.service";


export class Grafico {
 
  nodo?: TreeNode;
  filtroActivo?: FiltroActivo;
  data = signal<any>(undefined);
  options = signal<any>(undefined);
  tipo = signal<TipoGrafico>("pie");
  tipoGrafico = signal<number>(1);
  peticionRefrescoGrafico$: Subject<FiltroActivo> = new Subject();
  obtenerGrafico$: Observable<any>;
  subs: Subscription[] = [];
  cargando = true;
  readonly tiposDeGraficos = [{ label: 'Medio', value: 1 }, { label: 'Descendientes', value: 2 }, { label: 'Temporal', value: 3 }];

  constructor(private graficosService: GraficosService, private mesnsajeService: MensajesService) {
    this.obtenerGrafico$ = this.peticionRefrescoGrafico$.pipe(
      switchMap(filtro => this.recuperarDatosGrafico(filtro))
    );

    this.subs.push(this.obtenerGrafico$.subscribe((datos) => {
      this.generarGrafico(datos);
    }));
  }

  destroy() {
    this.subs.forEach(s => s?.unsubscribe());
  }

  sinNodoSeleccionado() {
    this.cargando = false;    
  }

  setNodo(n: TreeNode) {
    this.nodo = n;
    this.recalcularGrafico();
  }

  setFiltro(f: FiltroActivo) {
    this.filtroActivo = f;
    this.recalcularGrafico();
  }

  vistaSeleccionada(e: any) {
    this.tipoGrafico.set(e.value);
    if (this.nodo && this.nodo.data) this.recalcularGrafico();
  }

  filtro(): FiltroActivo {
    return { id: parseInt(this.nodo?.key!), inicio: this.filtroActivo?.inicio!, fin: this.filtroActivo?.fin! };
  }

  recalcularGrafico() {
    this.cargando = true;
    if (!this.filtroActivo || !this.nodo || !this.nodo.key) return;    
    const f = { id: parseInt(this.nodo.key!), inicio: this.filtroActivo.inicio, fin: this.filtroActivo.fin };    
    this.peticionRefrescoGrafico$.next(f);
  }
  recuperarDatosGrafico(filtro: FiltroActivo): any {
    switch (this.tipoGrafico()) {
      case 1:
        this.tipo.set("pie");
        return this.graficosService.inversionMedio(this.filtro());
      case 2:
        this.tipo.set("bar");
        return this.graficosService.inversionCampania(this.filtro());
      case 3:
        this.tipo.set("bar");
        return this.graficosService.inversionTemporal(this.filtro());
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
    this.cargando = false;
  }
}

export type TipoGrafico = "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
