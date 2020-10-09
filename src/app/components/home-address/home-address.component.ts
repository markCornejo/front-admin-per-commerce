import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';
import { FormSelectLocation } from '../../model/formSelectLocation.model';


@Component({
  selector: 'app-home-address',
  templateUrl: './home-address.component.html',
  styleUrls: ['./home-address.component.css']
})
export class HomeAddressComponent implements OnInit {

  @Input() selecteds;
  @Output() dataSelecteds: EventEmitter<FormSelectLocation> = new EventEmitter();
  exampleData: any;
  countries = [];
  states = [];
  cities = [];
  districs = [];
  /*
  selecteds = {
    countries: {
      id: null,
      name: '',
    },
    states: {
      id: null,
      name: ''
    },
    cities: {
      id: null,
      name: ''
    },
    districs: {
      id: null,
      name: ''
    }
  };  // valor seleccionado del select pais
*/
  selectedCountries: any;
  selectedStates: any;  // valor seleccionado del select states
  selectedCities: any;  // valor seleccionado del select ciudades
  selectedDistrics: any;  // valor seleccionado del select distritos
  location: any;

  site: any;  // data del sitio
  ubimain: any = {};  // ubicacion principal del sitio

  constructor(
    private config: NgSelectConfig,
    private store: Store<AppState>
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same
    // bindValue in most of the place.
    // You can also override bindValue for the specified template
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
   }

  ngOnInit(): void {

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

        this.selecteds.countries.id = this.ubimain.pc_countries_id;
        this.selecteds.countries.name = this.ubimain.ubicountry?.name;

        this.states = this.countries.find((el) => {
          return el.id === this.selecteds.countries.id;
        }).pc_states;

        if (this.ubimain.pc_states_id) {
          this.selecteds.states.id = this.ubimain.pc_states_id;  // valor inicial seleccionado del select states
          this.selecteds.states.name = this.ubimain.ubistate?.name;
        } else {
          this.selecteds.states.id = this.states[0]?.id;
          this.selecteds.states.name = this.states[0]?.name;
        }

        this.cities = this.states.find((el) =>  {
          return el.id === this.selecteds.states.id;
        }).pc_cities;

        if (this.ubimain.pc_cities_id) {
          this.selecteds.cities.id = this.ubimain.pc_cities_id;
          this.selecteds.cities.name = this.ubimain.ubicity?.name;
        } else {
          this.selecteds.cities.id = this.cities[0]?.id;
          this.selecteds.cities.name = this.cities[0]?.name;
        }

        this.districs = this.cities.find((el) =>  {
          return el.id === this.selecteds.cities.id;
        }).pc_districs;

        if (this.ubimain.pc_districs_id) {
          this.selecteds.districs.id = this.ubimain.pc_districs_id;
          this.selecteds.districs.name = this.ubimain.ubidistrict?.name;
        } else {
          this.selecteds.districs.id = this.districs[0]?.id;
          this.selecteds.districs.name = this.districs[0]?.name;
        }

      }
    });

  }

  // cuando seleccionas country
  establishStates($event) {
    this.states = $event.pc_states;
    this.selecteds.countries.name = $event.name;
    this.selecteds.states.id = null;
    this.selecteds.states.name = null;
    this.selecteds.cities.id = null;
    this.selecteds.cities.name = null;
    this.selecteds.districs.id = null;
    this.selecteds.districs.name = null;
    this.dataSelecteds.emit(this.selecteds);
  }

  // cuanda seleccionas states
  establishCities($event) {
    this.cities = $event.pc_cities;
    this.selecteds.states.name = $event.name;
    this.selecteds.cities.id = null;
    this.selecteds.cities.name = null;
    this.selecteds.districs.id = null;
    this.selecteds.districs.name = null;
    this.dataSelecteds.emit(this.selecteds);
  }

  // cuando seleccionas cities
  establishDistrics($event) {
    this.districs = $event.pc_districs;
    this.selecteds.cities.name = $event.name;
    this.selecteds.districs.id = null;
    this.selecteds.districs.name = null;
    this.dataSelecteds.emit(this.selecteds);
  }

  // cuando seleccionas districs
  establishFinist($event) {
    this.selecteds.districs.name = $event.name;
    console.log(this.selecteds);
    this.dataSelecteds.emit(this.selecteds);
  }

}
