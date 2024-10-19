import { BehaviorSubject } from "rxjs";

export class Dispositivo {
  esPequenio$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
