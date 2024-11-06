import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from "@angular/google-maps";

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 36.675198, lng: -6.246548 },
    zoom: 6,
  };
}
