import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// cropper
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularImagecropperComponent } from './angular-imagecropper/angular-imagecropper.component';

// Dropzone
import { DropzoneComponent } from './dropzone/dropzone.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ModalLocationComponent } from './modal-location/modal-location.component';
import { HomeAddressComponent } from './home-address/home-address.component';
import { HomePhoneComponent } from './home-phone/home-phone.component';

// NgSelect  Forms
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

// Helper
import { OnlynumberDirective } from '../helpers/onlynumber.directive';

export const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  // url: 'https://httpbin.org/post',
  url: 'http://localhost:8501/api/v1/es/admin/sites/1/images',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  createImageThumbnails: true,
  headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('sessionlogin'))?.token }
};

@NgModule({
  declarations: [
    AngularImagecropperComponent,
    DropzoneComponent,
    ModalLocationComponent,
    HomeAddressComponent,
    HomePhoneComponent,
    OnlynumberDirective
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    DropzoneModule,
    NgSelectModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    AngularImagecropperComponent
    // ImageCropperModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class CustomcomponentsModule { }
