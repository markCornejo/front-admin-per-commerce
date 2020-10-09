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

  constructor(
    private http: HttpClient,
    private helperFuntions: FunctionsService,
  ) { }

  ini() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
                container: 'mapa-mapbox', // container id
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.5, 40], // LNG, LAT
                zoom: 9 // starting zoom
              });

    this.clearMarker(-74.5, 40);

  }

  clearMarker(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      // types: 'Peru, Lima', // 'country,region,place,postcode,locality,neighborhood',
      mapboxgl: Mapboxgl,
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(this.mapa));

    marker.on('drag', () => {
      // console.log(marker.getLngLat());
    });

    //
    document.getElementById('fly').addEventListener('click', () => {

    });

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
            this.mapa.flyTo({
              center: resp.features[prop].center,
              zoom: 14,
              essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            break;
          }
        }
      }
    });

  }

  convertPlaceToCoor(place: string) {

    return this.http.get(`${apiMapBox}/mapbox.places/${place}.json?access_token=${mapboxKey}`);

  }

}
