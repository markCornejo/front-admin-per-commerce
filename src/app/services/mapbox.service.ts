import { Injectable } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FunctionsService } from '../helpers/functions.service';

const apiMapBox = environment.domainMapBox;
const mapboxKey = environment.mapboxKey;

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  mapa: Mapboxgl.Map;
  lng: number = -74.5;
  lat: number = 40;
  currentMarkers = [];

  constructor(
    private http: HttpClient,
    private helperFuntions: FunctionsService,
  ) { }

  ini() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
                container: 'mapa-mapbox', // container id
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.lng, this.lat], // LNG, LAT
                zoom: 12 // starting zoom
              });
  }

  // cuando usa el buscador de lugares de mapbox
  addGeocoderFindLocation() {
    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      // types: 'Peru, Lima', // 'country,region,place,postcode,locality,neighborhood',
      marker: false,
      mapboxgl: Mapboxgl,
    });

    geocoder.on('result', (e) => {
      this.deleteMarkerBeforeLocation();
      this.clearMarkerLocation(e.result.center[0], e.result.center[1]);
      // map.getSource('single-point').setData(e.result.geometry);
    });

    this.mapa.addControl(geocoder);
  }

  // agregar marcador de locacion
  clearMarkerLocation(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

    this.currentMarkers.push(marker);
    this.lng = lng;
    this.lat = lat;
    // document.getElementById('geocoder').appendChild(geocoder.onAdd(this.mapa));
    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      this.lng = lngLat.lng;
      this.lat = lngLat.lat;
    });
  }

  // borrar todos los marcadores de locacion
  deleteMarkerBeforeLocation() {
    if (this.currentMarkers.length > 0) {
      for (let i = this.currentMarkers.length - 1; i >= 0; i--) {
        this.currentMarkers[i].remove();
      }
    }
  }

  // obtener marker de locacion
  currentMarkerLocation() {
    return [this.lng, this.lat];
  }

  // volar hacia el lugar que se está seleccionando
  flyPlace(place: string, country: string) {

    const queryPlace =  this.helperFuntions.removeAccents(place.trim()).replace(/ /g, '%20');

    this.convertPlaceToCoor(queryPlace).subscribe( (resp: any) => {

      country = this.helperFuntions.removeAccents(country).toLowerCase();

      if(resp.features.length > 0) {
        // tslint:disable-next-line: forin
        for (const prop in resp.features) {
          // console.log(resp.features[prop].place_name.toLowerCase(), country);
          if (resp.features[prop].place_name.toLowerCase().indexOf(country) > 0) {
            this.deleteMarkerBeforeLocation();
            this.mapa.flyTo({
              center: resp.features[prop].center,
              zoom: 14,
              essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            this.clearMarkerLocation(resp.features[prop].center[0], resp.features[prop].center[1]);
            break;
          }
        }
      }
    });

  }

  // convertir lugares a coordenadas geograficas
  convertPlaceToCoor(place: string) {

    return this.http.get(`${apiMapBox}/mapbox.places/${place}.json?access_token=${mapboxKey}`);

  }

}
