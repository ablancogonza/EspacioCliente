import { signal } from "@angular/core";
import { VistaSeleccionadaAdmin } from "../shared/enumerados/vista-seleccionada-admin";
import { MenuItem, TreeNode } from "primeng/api";
import { AdminService } from "./admin.service";
import { Nodo } from "../arbol-cliente/nodo";
import { HttpErrorResponse } from "@angular/common/http";
import { MensajesService } from "../shared/servicios/mensajes.service";
import { TreeNodeExpandEvent, TreeNodeSelectEvent } from "primeng/tree";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class Admin {
  vistaSeleccionada = signal<VistaSeleccionadaAdmin>(VistaSeleccionadaAdmin.arbol);
  
}
