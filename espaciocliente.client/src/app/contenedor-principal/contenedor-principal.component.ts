import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DispositivoGrandeComponent } from '../componentes/dispositivo-grande/dispositivo-grande.component';
import { DispositivoPequenioComponent } from '../componentes/dispositivo-pequenio/dispositivo-pequenio.component';
import { EstadoService } from '../servicios/estado.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contenedor-principal',
  standalone: true,
  imports: [CommonModule, DispositivoPequenioComponent, DispositivoGrandeComponent],
  templateUrl: './contenedor-principal.component.html',
  styleUrl: './contenedor-principal.component.css'
})
export class ContenedorPrincipalComponent implements OnInit {
  //esPequenio$!: Observable<boolean>;
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.estadoService.dispositivo.esPequenio$.next(width < 768);
  }
  constructor(
    //private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef,
    public estadoService: EstadoService) {    
  }

  ngOnInit() {
    //this.breakpointObserver.observe('(max-width: 768px')
    //  .pipe(takeUntilDestroyed(this.destroyRef))
    //  .subscribe(state => {
    //    this.estadoService.dispositivo.esPequenio$.next(state.matches);
    //  });
    this.estadoService.dispositivo.esPequenio$.next(window.innerWidth < 768);
    //this.esPequenio$ = this.estadoService.dispositivo.esPequenio$;
  }
}
