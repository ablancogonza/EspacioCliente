import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arbol',
  standalone: true,
  imports: [],
  templateUrl: './arbol.component.html',
  styleUrl: './arbol.component.css'
})
export class ArbolComponent {
  @Input() pequenio: boolean = false;
}
