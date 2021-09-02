import { Component, OnInit } from '@angular/core';
import  * as mapboxgl  from 'mapbox-gl'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa {
    height: 100%;
    width : 100%;
  }
  `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    (mapboxgl as any).accessToken = environment.mapboxToken;
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -6.139230399303359 , 37.3341054698427   ],
      zoom: 17
    });


  }

}
