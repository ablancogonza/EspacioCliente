import { signal } from "@angular/core";
import { VistaSeleccionadaAdmin } from "../shared/enumerados/vista-seleccionada-admin";

export class Admin {
  vistaSeleccionada = signal<VistaSeleccionadaAdmin>(VistaSeleccionadaAdmin.arbol);

}
