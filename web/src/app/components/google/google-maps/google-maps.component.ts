import { Component } from '@angular/core';

import { GoogleMapsModule } from "@angular/google-maps";

@Component({
  selector: 'app-google-maps',
  imports: [GoogleMapsModule],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss'
})
export class GoogleMapsComponent {

}
