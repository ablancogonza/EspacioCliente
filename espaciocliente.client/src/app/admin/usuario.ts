import { Nodo } from "./nodo";

export interface Usuario {    
  Id: number,
  Nombre: string,
  Login: string,
  IdRol: number,
  Rol: string,
  Nodos: Nodo[]
}
