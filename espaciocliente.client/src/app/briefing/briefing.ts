import { Medios } from "../shared/utils/medios";

export class Briefing {

  vista: string = 'lista';
  medios = Medios.medios();

  nuevo() {
    this.vista = 'detalle';
  }
}
