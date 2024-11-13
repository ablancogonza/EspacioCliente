export class Presupuesto {
  static dateToPresupuesto(d: Date): number {
    return d.getFullYear() * 100 + d.getMonth() + 1;
  }

  static presupuestoToDate(n: number): Date {
    return new Date(Math.round(n / 100), (n % 100) - 1, 1);
  }
}
