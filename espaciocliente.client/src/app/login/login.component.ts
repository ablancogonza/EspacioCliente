import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService, TokenResponse } from '../servicios/auth.service';
import { ProcesandoComponent } from '../componentes/procesando/procesando.component';
import { Router } from '@angular/router';
import { MensajesService } from '../servicios/mensajes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EstadoService } from '../servicios/estado.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ButtonModule, ProcesandoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | undefined;
  procesando: boolean = false;

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

  acceder() {    
    if (this.loginForm.valid) {
      this.procesando = true;
      this.authService.signIn(this.email?.value, this.password?.value).subscribe({
        next: (t) => {
          localStorage.setItem('email', this.email?.value);
          this.estadoService.init(this.email?.value, t.token);          
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
