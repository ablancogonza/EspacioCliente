import { Valla } from "../../servicios/mapa.service";

export class VallaExt {
  static position(valla: Valla) {
    return { lat: parseFloat(valla.lat), lng: parseFloat(valla.lon) }
  }
}
