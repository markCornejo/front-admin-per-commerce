import { Component, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-angular-imagecropper',
  templateUrl: './angular-imagecropper.component.html',
  styleUrls: ['./angular-imagecropper.component.css']
})
export class AngularImagecropperComponent implements OnInit {

  // @Input() cropUrlImage: string;
  @Input() inputCropped: any;

  imageChangedEvent: any = '';
  croppedImage = '';

  resizeToWidth: number;
  cropperStaticWidth: number;
  cropperMinWidth: number;
  aspectRatio: string;
  maintainAspectRatio: boolean;
  hideResizeSquares: boolean;

  constructor() { }

  ngOnInit(): void {
    this.maintainAspectRatio = (this.inputCropped?.maintainAspectRatio) ? this.inputCropped?.maintainAspectRatio : true;
    this.aspectRatio = (this.inputCropped?.aspectRatio) ? this.inputCropped?.aspectRatio : 4 / 3;
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

}
