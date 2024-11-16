import { TipoEntradaMensaje } from "../shared/enumerados/tipo-entrada-mensaje";

export interface EntradaMensaje {
  tipo: TipoEntradaMensaje,
  fecha?: string,
  hora?: string,
  usuario?: string,
  texto?: string,
  imagen?: string
}
