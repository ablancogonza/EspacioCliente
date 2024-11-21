import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Fecha } from "../utils/fecha";

export class FechaValidators {
  static mayorIgualQue(controlInicio: AbstractControl): ValidatorFn {
    return (controlFin: AbstractControl): ValidationErrors | null => {
      const fechaInicio: Date = controlInicio.value;
      const fechaFin: Date = controlFin.value;
      if (!fechaInicio || !fechaFin) {
        return null;
      }
      if (Fecha.fechaSinHora(fechaInicio) > Fecha.fechaSinHora(fechaFin)) {
        return { mayorIgualQue: true };
      }
      return null;
    };
  }
}
