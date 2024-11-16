import { Valla } from "../../mapa/valla";


export class VallaExt {
  static position(valla: Valla) {
    return { lat: parseFloat(valla.lat), lng: parseFloat(valla.lon) }
  }
}
