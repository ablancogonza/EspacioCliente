import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { MensajesService } from './servicios/mensajes.service';
import { Router, RouterModule } from '@angular/router';
import { EstadoService } from './servicios/estado.service';
import es from '@angular/common/locales/es';
import { AuthService } from './servicios/auth.service';
import { Fecha } from './shared/utils/fecha';


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, ToastModule],
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  pequenio: boolean = false;
  constructor(private config: PrimeNGConfig,
    private messageService: MessageService,
    private mensajesService: MensajesService,
    private authService: AuthService,
    private estadoService: EstadoService,
    private router: Router) {
    config.setTranslation({
      monthNamesShort: Fecha.meses,
      accept: 'Aceptar',
      reject: 'Cancelar'
    });
    this.subs.push(this.mensajesService.mensaje$.subscribe({
      next: (m) => { this.messageService.add(m); },
    }));    
  }

  ngOnInit() {

    registerLocaleData(es);

    const token = localStorage.getItem('token')??'';
    const email = localStorage.getItem('email')??'';        
    this.estadoService.init(email, token);                
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s?.unsubscribe());
  }

  title = 'Espacio Cliente';
}
