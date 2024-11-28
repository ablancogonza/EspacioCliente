import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MensajesService } from './shared/servicios/mensajes.service';
import { Router, RouterModule } from '@angular/router';
import es from '@angular/common/locales/es';
import { Fecha } from './shared/utils/fecha';
import { EstadoService } from './shared/estado/estado.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, ToastModule],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  
  constructor(private config: PrimeNGConfig,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private mensajesService: MensajesService,   
    private estadoService: EstadoService,
    private destroyRef: DestroyRef) {
    config.setTranslation({
      monthNamesShort: Fecha.meses,
      monthNames: Fecha.mesesLargo,
      accept: 'Aceptar',
      reject: 'Cancelar'
    });

    this.mensajesService.mensaje$.
      pipe(takeUntilDestroyed(this.destroyRef)).
      subscribe({
        next: (m) => { this.messageService.add(m); },
      });    
  }

  ngOnInit() {

    registerLocaleData(es);

    const token = localStorage.getItem('token')??'';
    const email = localStorage.getItem('email')??'';        
    this.estadoService.init(email, token);

    console.log('login ngOnInit');

    if (this.estadoService.sesion.tieneCredenciales()) {
      this.authService.isTokenValid().subscribe({
        next: () => {
          console.log('login ngOnInit OK');
          this.estadoService.postInit();
          setTimeout(() => {
            this.router.navigateByUrl('/principal');
          }, 300);
        },
        error: (e: any) => {
          console.log('login ngOnInit KO');
          this.estadoService.cerrarSesion();
          
        }
      })
    } else {
      
    }
  }
  
  title = 'Espacio Cliente';
}
