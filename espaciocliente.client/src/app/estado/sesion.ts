export class Sesion {
  private token: string = '';
  private email: string = '';

  getToken(): string { return this.token; }
  setToken(token: string) { this.token = token; };

  getEmail(): string { return this.email; }
  setEmail(email: string) { this.email = email; };
}
