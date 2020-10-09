import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { SiteService } from '../services/site.service';
import { LocationService } from '../services/location.service';
import { environment } from '../../environments/environment';
import { AppState } from '../app.reducer';
import * as structure from './structure.actions';

const lang = environment.lang;

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  siteId: number;
  constructor(
    private siteService: SiteService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    console.log('pasando por el modulo de estructura');
    this.siteId = this.route.snapshot.params.site_id;

    // obtener data del sitio
    this.siteService.siteInfo(lang, this.siteId).subscribe( resp => {

      if (resp.ok){
        const data: any = resp.data;
        this.store.dispatch(structure.getSite({site: data})); // registrar user en store redux
      }

    }, err => {
      console.log(err);
    });

    // obtener data de ubicacion geografica
    this.locationService.getUbigeo(lang, this.siteId, '').subscribe( (resp: any) => {

      if (resp.ok) {
        const data = resp.data;
        this.store.dispatch(structure.getUbigeoRx({location: data})); // registrar user en store redux
      }

    }, err => {
      console.log(err);
    });



  }

}
