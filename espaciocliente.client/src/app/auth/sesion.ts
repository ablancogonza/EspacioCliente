export class Sesion {
  
  private token: string = '';
  private email: string = '';
  private rol: number = 0;
  
  constructor(email: string, token: string, rol: number) {
    this.token = token;
    localStorage.setItem('token', token);
    this.email = email;
    localStorage.setItem('email', email);
    this.rol = rol;
    localStorage.setItem('rol', rol.toString());
  }

  getToken(): string { return this.token; }

  getEmail(): string { return this.email; }

  getRol(): number { return this.rol; }

  static tieneCredenciales(): boolean {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const rol = localStorage.getItem('rol');
    const tiene = token !== '' && email !== '' && rol !== '';
    if (!tiene) {
      this.eliminarLocalStorage(); 
    }
    return tiene;
  }

  close() {
    this.token = '';
    this.email = '';
    this.rol = 0;
    Sesion.eliminarLocalStorage();
  }

  private static eliminarLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
  }
}
