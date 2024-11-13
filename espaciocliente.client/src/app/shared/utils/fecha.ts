export class Fecha {
 
  static readonly meses: string[] = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  static mesAnio(d: Date): string {
    return `${this.meses[d.getMonth()]}-${d.getFullYear()}`;
  }

  static mismoDia(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDay() == b.getDay();
  }

  static formato(fecha: Date): string {
    return `${fecha.getDate()}/${Fecha.meses[fecha.getMonth()]}/${fecha.getFullYear()}`
  }

  static hora(fecha: Date): string | undefined {
    return `${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2,'0')}`;
  }

  static fechaHora(fecha: Date | string | undefined): string {
    if (!fecha) return '';
    if (typeof fecha === 'string') {
      fecha = new Date(fecha);
    }
    return `${fecha.getDate()}/${Fecha.meses[fecha.getMonth()]}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`;
  }
}
