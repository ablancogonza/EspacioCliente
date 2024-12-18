import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../auth.service';
import { EstadoService } from '../../shared/estado/estado.service';
import { MensajesService } from '../../shared/servicios/mensajes.service';
import { CargandoComponent } from '../../shared/components/cargando/cargando.component';
import { Rol } from '../../shared/enumerados/rol';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, CargandoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | undefined;
  procesando = signal<boolean>(false);

  constructor(private router: Router, private authService: AuthService, private estadoService: EstadoService, private mensajesService: MensajesService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.procesando.set(true);
    setTimeout(() => { this.acceder(); });
  }

  acceder() {    
    if (this.loginForm.valid) {      
      this.authService.signIn(this.email?.value, this.password?.value).subscribe({
        next: (t) => {               
          this.estadoService.init(this.email?.value, t.token, t.rol);
          this.estadoService.postInit();   
          if (t.rol === Rol.admin) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/principal');
          }
        },
        error: (e: HttpErrorResponse) => {         
          this.procesando.set(false);
          if (e.error.status === 401) {
            this.mensajesService.error('Las credenciales no son correctas');
          } else {
            this.mensajesService.errorHttp(e);
          }
        }        
      });
    }
  }  
}
