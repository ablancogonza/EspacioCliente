import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-contenedor-responsive',
  standalone: true,
  imports: [],
  templateUrl: './contenedor-responsive.component.html',
  styleUrl: './contenedor-responsive.component.css'
})
export class ContenedorResponsiveComponent {
  @Output() ancho: EventEmitter<number> = new EventEmitter();
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.ancho.emit(width);
  }   
}
