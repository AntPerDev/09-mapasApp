import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment';

interface MarcadorColor {
  color: string,
  marker? : mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    #mapa {
      height: 100%;
      width : 100%;
    }

    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }


    li {
      cursor: pointer;

    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-6.139230399303359, 37.3341054698427];

  //array de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() {
    // console.log('constructor ', this.divMapa);

  }
  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {

    (mapboxgl as any).accessToken = environment.mapboxToken;

    // console.log('AfterViewInit ', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const marker = new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa )

    this.leerLocalStorage();

  }


  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));


    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

  }

  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo(
      {
        center: marker.getLngLat()
      })

  }


  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]

      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))

  }


  leerLocalStorage() {
    if( !localStorage.getItem('marcadores')){
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);


    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat( m.centro!)
      .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color:m.color
      });


      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
    })
  }

  borrarMArcador(i: number){

    this.marcadores[i].marker?.remove();
    this.marcadores.splice( i, 1);
    this.guardarMarcadoresLocalStorage();


  }
}