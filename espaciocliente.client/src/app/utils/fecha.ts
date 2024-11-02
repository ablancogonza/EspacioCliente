export class Fecha {
  static readonly meses: string[] = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  static mesAnio(d: Date): string {
    return `${this.meses[d.getMonth()]}-${d.getFullYear()}`;
  }

}
