import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-phone',
  templateUrl: './home-phone.component.html',
  styleUrls: ['./home-phone.component.css']
})
export class HomePhoneComponent implements OnInit {

  exampleData: any;
  countries = [];
  location: any;
  selectedCountries: any; // valor seleccionado del select pais
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
        this.selectedCountries = this.ubimain.pc_countries_id;

      }

    });

  }




}
