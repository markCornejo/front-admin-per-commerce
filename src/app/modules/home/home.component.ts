import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { DropzoneComponent } from '../../components/dropzone/dropzone.component';
import { ModalLocationComponent } from '../../components/modal-location/modal-location.component';
import { AppState } from '../../app.reducer';

import { environment } from '../../../environments/environment';

const domainApiGateWay = environment.domainApiGateWay;
const domainApiSite = environment.domainApiSite;
const mainCountry = environment.mainCountry;
const lang = environment.lang;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileForm: FormGroup;
  changeDomain: number;
  closeResult = '';
  srclogo: string = domainApiGateWay + '/img/mi_logo.png';
  srcfavicon: string = domainApiGateWay + '/img/mi_favicon.png';
  siteId: number; // id del sitio
  site: any; // data del sitio
  ubimain: any = {}; // ubicación principal principal

  constructor(
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private ngbModel: NgbModal,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.changeDomain = 0; // 0 => subdomain, 1 => domain
    this.profileForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required ],
      domain: ['', Validators.required ],
      subdomain: ['', Validators.required ],
      logo: [''],
      favicon: [''],
    });

    this.store.select('site').subscribe( resp => {

      this.site = resp.site;
      if(this.site) {
        this.profileForm?.patchValue(this.site);

        if (this.profileForm?.controls.domain.value){
          this.changeDomain = 1;
        }

        // console.log(this.site?.sites_locations);
        this.ubimain = this.site?.sites_locations.find((el) =>  {
          return el.main === 1;
        });
      }

    });
    /*
    this.siteId = this.route.parent.parent.snapshot.params.site_id;
    this.siteService.siteInfo(lang, this.siteId).subscribe( resp => {

      if (resp.ok){
        const data = resp.data;
        this.profileForm.patchValue(data);

        if (this.profileForm.controls.domain.value){
          this.changeDomain = 1;
        }
      }
    }, err => {
      console.log(err);
    });
    */
  }

  profilePlace() {}

  changeDom() {
    this.changeDomain = (this.changeDomain) ? 0 : 1;
  }

  openDialogGallery(image: string) {
    const modald = this.ngbModel.open(DropzoneComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'dropzone-homemodal'
    });

    modald.componentInstance.siteId = this.siteId;
    modald.componentInstance.lang = lang;

    modald.result.then((result) => {
      // tslint:disable-next-line: no-string-literal
      this['src' + image] = result.dataURLx300;
      this.profileForm.controls[image].setValue(result.name);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDialogLocation() {
    const modald = this.ngbModel.open(ModalLocationComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      // windowClass: 'dropzone-homemodal'
    });

    modald.result.then((result) => {
      // tslint:disable-next-line: no-string-literal
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
