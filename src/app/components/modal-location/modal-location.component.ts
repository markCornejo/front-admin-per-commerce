import { Component, OnInit, Input } from '@angular/core';
import { MapboxService } from '../../services/mapbox.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { FormSelectLocation } from '../../model/formSelectLocation.model';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.css']
})
export class ModalLocationComponent implements OnInit {

  @Input() type: string; // locacion new o edit
  @Input() lang;

  selecteds: FormSelectLocation; // locación selected del mapa
  countries = [];
  location: any;
  selectedCountries: any; // valor seleccionado del select pais
  site: any;  // data del sitio
  ubimain: any = {};  // ubicacion principal del sitio
  address: string; // input direccion

  error: any = {
    msgphone: '',
    msgcodphone: '',
  };

  data: any = {
    phone: '',
    // codphone: '',
    pc_countries_id: '',
    pc_states_id: '',
    pc_cities_id: '',
    pc_districs_id: '',
    lat: '',
    lng: '',
    address: '',
    main: 0
  }

  constructor(
    private locationService: LocationService,
    private mapaboxService: MapboxService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.selecteds = new FormSelectLocation();
    this.mapaboxService.ini();
    this.mapaboxService.addGeocoderFindLocation();

    this.store.select('base').subscribe( base => {
      this.location = Object.values(base.location);
      this.countries = this.location;
    });

    this.store.select('site').subscribe( resp => {
      this.site = resp.site;
      if (this.site) {

        if (this.type === 'new') { // locacion nueva
          this.ubimain = this.site?.sites_locations.find((el) =>  {
            return el.main === 1;
          });
          this.selectedCountries = this.ubimain.pc_countries_id;
        } else {
          // editar locacion
        }
      }

    });

  }

  // Update mapa (@Output)
  dataSelecteds(e: FormSelectLocation) {

    this.data.pc_countries_id = e.countries.id;
    this.data.pc_states_id = e.states.id;
    this.data.pc_cities_id = e.cities.id;
    this.data.pc_districs_id = e.districs.id;
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

  // Get values phone (@Output)
  valuesHomePhone(e: any) {
    this.data.phone = e.phone;
  }

  save() {

    this.data.lng = this.mapaboxService.currentMarkerLocation()[0];
    this.data.lat = this.mapaboxService.currentMarkerLocation()[1];

    // obtener data de ubicacion geografica
    this.locationService.createLocation(this.lang, this.site.id, this.data).subscribe( (resp: any) => {

      if (resp.ok) {
        const data = resp.data;
        // this.store.dispatch(structure.getUbigeoRx({location: data})); // registrar user en store redux
      }

    }, err => {
      console.log(err);
    });


  }

  prueba() {
    console.log(this.selecteds);
    console.log(this.mapaboxService.currentMarkerLocation());
  }

}
