import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { DropzoneComponent } from '../../components/dropzone/dropzone.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { NgbModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    DropzoneModule,
    NgbModule,
  ],
  providers: [
    NgbActiveModal
  ],
})
export class HomeModule { }
