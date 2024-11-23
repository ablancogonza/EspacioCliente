export class Arbol {

  static readonly _tipoNodo: string[] = ['', 'GR', 'CL', 'PR', 'TI', 'EJ', 'CA'];
  static tipoNodo(n: number) {
    return this._tipoNodo[n];
  }

  static readonly _tooltipNodo: string[] = ['', 'Grupo', 'Cliente', 'Provincia', 'Tienda', 'Ejercicio', 'Campaña'];
  static desTipoNodo(n: number): string {
    return this._tooltipNodo[n];
  }
}
