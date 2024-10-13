import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;  
  error: string | undefined;  
  //email!: FormControl;
  //pass!: FormControl;

  constructor() {    
    this.loginForm = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  acceder() {
    console.log('acceder');

    //if (!this.loginForm || !this.loginForm.valid) return;

    //console.log('acceder ok')
    //this.principalService.bloquearUI(true);

    //this.authService.signIn(this.loginForm!.get('email')?.value, this.loginForm!.get('password')?.value)
    //  .subscribe(
    //    claims => {
    //      console.log('auth: ', claims);

    //      //this.authService.setToken(v['token']);
    //      if (this.loginForm!.get('rememberme')?.value === true) {
    //        localStorage.setItem('email', this.loginForm!.get('email')?.value);
    //      } else {
    //        localStorage.removeItem('email');
    //      }
    //      this.usuarioService.claims$.next(claims);

    //      let agencia = this.usuarioService.agencias().find(a => a.c == 'GL');
    //      if (!agencia) {
    //        agencia = this.usuarioService.agencias()[0];
    //      }
    //      this.configService.cambioAgenciaSeleccionada(agencia); // Agencia por defecto para el usuario
    //      this.storeService.configuracion.agencia.set(agencia);
    //      this.semaforoService.liberarRecursosUsuario().subscribe(() => { });
    //      //  this.authService.autenticado$.next(true);
    //      //this.router.navigate(['/planes']);
    //      this.principalService.bloquearUI(false);
    //    }, err => {
    //      if (err.status === 401) {
    //        this.error = 'Las credenciales son incorrectas';
    //      } else {
    //        this.error = 'Se ha producido un error';
    //      }
    //      this.principalService.bloquearUI(false);
    //      //this.principalService.bloquearUI(false);
    //    });

  }
}
