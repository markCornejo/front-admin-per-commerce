import { Component, OnInit } from '@angular/core';
import { MapboxService } from '../../services/mapbox.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { FormSelectLocation } from '../../model/formSelectLocation.model';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.css']
})
export class ModalLocationComponent implements OnInit {

  selecteds: FormSelectLocation;
  countries = [];
  location: any;
  selectedCountries: any; // valor seleccionado del select pais
  site: any;  // data del sitio
  ubimain: any = {};  // ubicacion principal del sitio

  constructor(
    private mapaboxService: MapboxService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.selecteds = new FormSelectLocation();
    this.mapaboxService.ini();

    this.store.select('base').subscribe( base => {
      this.location = Object.values(base.location);
      this.countries = this.location;
    });

    this.store.select('site').subscribe( resp => {
      this.site = resp.site;
      if(this.site) {
        // console.log(this.site?.sites_locations);
        this.ubimain = this.site?.sites_locations.find((el) =>  {
          return el.main === 1;
        });
        this.selectedCountries = this.ubimain.pc_countries_id;
      }

    });

  }

  dataSelecteds(e: FormSelectLocation) {

    // tslint:disable-next-line: no-var-keyword
    var place = ' '; var country;
    // tslint:disable-next-line: forin
    for (const prop in e) {
      if (e[prop].name) {
        place = place + ' ' + e[prop].name;
        if (prop === 'countries') {
          country = e[prop].name;
        }
      }
    }

    this.mapaboxService.flyPlace(place, country);

  }

  prueba() {
    console.log(this.selecteds);
  }

  volar() {
    console.log();
  }

}
