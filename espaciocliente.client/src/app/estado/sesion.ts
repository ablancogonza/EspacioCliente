export class Sesion {
  private token: string = '';

  getToken(): string { return this.token; }
  setToken(token: string) { this.token = token; };
}
