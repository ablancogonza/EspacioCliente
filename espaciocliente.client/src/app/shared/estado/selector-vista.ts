import { BehaviorSubject } from "rxjs";
import { VistaSeleccionada } from "../enumerados/vista-seleccionada";

export class SelectorVista {
  vista$: BehaviorSubject<number> = new BehaviorSubject(VistaSeleccionada.arbol);
}
