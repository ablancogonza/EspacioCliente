import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { ProcesandoComponent } from '../../shared/components/procesando/procesando.component';
import { AuthService } from '../auth.service';
import { EstadoService } from '../../shared/estado/estado.service';
import { MensajesService } from '../../shared/servicios/mensajes.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, ProcesandoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | undefined;
  procesando: boolean = true;

  constructor(private router: Router, private authService: AuthService, private estadoService: EstadoService, private mensajesService: MensajesService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {

    if (this.estadoService.sesion.tieneCredenciales()) {
      this.authService.isTokenValid().subscribe({
        next: () => {
          this.estadoService.postInit();
          setTimeout(() => {
            this.router.navigateByUrl('/principal');
          }, 300);
        },
        error: (e: any) => {
          this.estadoService.cerrarSesion();
          this.procesando = false;
        }
      })
    } else {
      this.procesando = false;
    }
    console.log('procesando: ', this.procesando);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.procesando = true;
    setTimeout(() => { this.acceder(); });
  }

  acceder() {    
    if (this.loginForm.valid) {      
      this.authService.signIn(this.email?.value, this.password?.value).subscribe({
        next: (t) => {
          localStorage.setItem('email', this.email?.value);
          this.estadoService.init(this.email?.value, t.token);
          this.estadoService.postInit();
          this.procesando = false;
          this.router.navigateByUrl('/principal');
        },
        error: (e: HttpErrorResponse) => {         
          this.procesando = false;
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
