import { Component, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SiteService } from '../../services/site.service';
import { AlertsService } from '../../helpers/alerts.service';

@Component({
  selector: 'app-angular-imagecropper',
  templateUrl: './angular-imagecropper.component.html',
  styleUrls: ['./angular-imagecropper.component.css']
})
export class AngularImagecropperComponent implements OnInit {

  @Input() cropUrlImage: string; //
  @Input() inputCropped: any; // conjunto de variables de cropper en json
  @Input() siteId: number;
  @Input() imageId: number;

  imageChangedEvent: any = '';
  croppedImage = '';
  imageURL;
  data: any;
  loadermain: boolean = true; // loader para el guardar

  // variables del paquete de cropper
  resizeToWidth: number;
  cropperStaticWidth: number;
  cropperMinWidth: number;
  aspectRatio: string;
  maintainAspectRatio: boolean;
  hideResizeSquares: boolean;
  onlyScaleDown = true;

  constructor(
    private siteService: SiteService,
    private helperAlerts: AlertsService,
  ) { }

  ngOnInit(): void {
    this.imageURL = this.cropUrlImage;
    this.maintainAspectRatio = (this.inputCropped?.maintainAspectRatio) ? this.inputCropped?.maintainAspectRatio : true;
    this.aspectRatio = (this.inputCropped?.aspectRatio) ? this.inputCropped?.aspectRatio : 1 / 3;
    this.resizeToWidth = (this.inputCropped?.resizeToWidth) ? this.inputCropped?.resizeToWidth : 0;
    this.cropperStaticWidth = (this.inputCropped?.cropperStaticWidth) ? this.inputCropped?.cropperStaticWidth : 0;
    this.cropperMinWidth = (this.inputCropped?.cropperMinWidth) ? this.inputCropped?.cropperMinWidth : 50;
    this.hideResizeSquares = (this.inputCropped?.hideResizeSquares) ? this.inputCropped?.hideResizeSquares : false;

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
    this.data = event;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  saveAlso() {
    this.data.orientation = 'h';

    this.loadermain = false;
    this.siteService.editCropperImage('es', this.siteId, this.imageId, this.data).subscribe( resp => {
      this.loadermain = true;
      this.helperAlerts.swalAlertSimple('success');
    }, error => {
      console.log(error);
      this.loadermain = true;
      alert('Problemas al eliminar imagen. Inténtelo nuevamente.');
    });
  }

  saveChoose() {
    this.data.orientation = 'h';

    this.loadermain = false;
    this.siteService.editCropperImage('es', this.siteId, this.imageId, this.data).subscribe( resp => {
      this.loadermain = true;
      this.helperAlerts.swalAlertSimple('success');
    }, error => {
      console.log(error);
      this.loadermain = true;
      alert('Problemas al eliminar imagen. Inténtelo nuevamente.');
    });
  }

}
