export class Sesion {
  private token: string = '';
  private email: string = '';

  getToken(): string { return this.token; }
  setToken(token: string) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  getEmail(): string { return this.email; }
  setEmail(email: string) {
    this.email = email;
    if (email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  };
}
