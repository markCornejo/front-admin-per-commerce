import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FunctionsService } from '../../helpers/functions.service';
import { SiteService } from '../../services/site.service';
import { AlertsService } from '../../helpers/alerts.service';


@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  // variable for imagecropper
  cropimage: boolean = true;
  cropUrlImage = '';
  active: number = 1;
  inputCropped: any = {
    resizeToWidth: 325,
    aspectRatio: 1 / 2
  }; // agregar un json con las opciones para el comportamiento del cropper

  helpint: number = 1; // variable de apoyo para no ejecutar la renderización de imagenes 2 veces
  dataExample: any; // data ejemplo para cargar imagenes
  datainit: any; // informacion inicial y total de la instancia dropzone
  loadermain: boolean = false; // loader principal para cargar las images del modal
  buttonvermas: boolean = false;
  buttonvermasloader: boolean = false;

  takeImage: number = 15;
  skipImage: number = 0;

  // variables input
  @Input() siteId: number;
  @Input() lang;

  imageId: number; // id de la imagen

  public config: DropzoneConfigInterface = {
    clickable: true,
    // maxFiles: 2,
    maxFilesize: 11,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    previewsContainer: '.images-list-dropzone',
    thumbnailWidth: 240,
    thumbnailHeight: 240,
    dictRemoveFile: 'Eliminando la imagen',
    dictRemoveFileConfirmation: '¿Está seguro que desea elimina la imagen?',
  };

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;

  constructor(
    private activeModal: NgbActiveModal,
    private helperFuntions: FunctionsService,
    private helperAlerts: AlertsService,
    private siteService: SiteService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // this.config.previewTemplate = document.getElementById('preview-template').innerHTML;
    this.config.renameFile = (file: any) => {
      const filename = this.siteId + (Math.floor(Math.random() * 1000000) + 100) + this.helperFuntions.cleartext(file.name);
      return filename;
    };
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.config.previewTemplate = document.getElementById('preview-template').innerHTML;
    this.cdRef.detectChanges();
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
    args[0].previewElement.querySelector('.dz-error-mark').classList.remove('d-none');
    args[0].previewElement.querySelector('#btn-view-image-dropzone').remove();
    args[0].previewElement.querySelector('.img-thumbnail-preview').remove();
  }

  public onUploadSuccess(args: any): void {
    this.loadermain = false;
    console.log('onUploadSuccess:', args);
    args[0].previewElement.querySelector('.dz-success-mark').classList.remove('d-none');
    args[0].previewElement.querySelector('.img-dropzone-loading').classList.add('d-none');
    args[0].previewElement.querySelector('.img-thumbnail-preview').classList.remove('d-none');
    args[0].previewElement.querySelector('.dz-filename').innerHTML = args[0].upload.filename;
    args[0].previewElement.querySelector('#btn-view-image-dropzone').classList.remove('disabled');
    args[0].previewElement.querySelector('#btn-edit-image-dropzone')?.classList.remove('disabled');
    // console.log(args[0].previewElement.querySelector('.typeimage'));
    setTimeout(() => {
      args[0].previewElement.querySelector('.dz-progress').classList.add('d-none');
    }, (5000));

    this.getImagesStore(0, this.takeImage, 0);
  }

  public onAddedFile(args: any): void {
    // console.log('onAddedFile', args);
    args.previewElement.querySelector('.typeimage').classList.remove('d-none');
    args.previewElement.querySelector('.typeimage').innerHTML = args?.typeimage;
    if (args?.typeimage === 'GIF') {
      // .querySelector('#btn-edit-image-dropzone').remove();
      const elem = args.previewElement.querySelector('#btn-edit-image-dropzone');
      elem.parentNode.removeChild(elem);
    }
    if (args.status) {
      args.previewElement.querySelector('.dz-progress').classList.remove('d-none');
      const docutags = document.getElementById('images-list-dropzone').querySelectorAll('.dz-preview');
      const docDoc = Array.from(docutags);
      const arrUlti = docDoc[docDoc.length - 1];

      docutags[docDoc.length - 1].parentNode.removeChild(docutags[docDoc.length - 1]);

      docDoc.pop();
      docDoc.splice(1, 0, arrUlti);
      document.getElementById('images-list-dropzone').insertBefore(arrUlti, document.getElementById('images-list-dropzone').firstChild);
      const prueba = [...this.datainit.files];
    }
  }

  public onComplete(args: any): void {
    // console.log('onComplete', args);
  }

  public onInitImage(event: any) {
    // console.log('onInitImage:', event);
    this.datainit = event;
    this.takeImage = 15;
    this.skipImage = 0;
    this.loadermain = false;

    this.datainit.on('thumbnail', (file, response) => {
      // boton seleccionar imagen
      file.previewElement.querySelector('.img-thumbnail-preview').addEventListener('click', () => {
        console.log('cerrando modal');
        this.activeModal.close(file);
      });

      // boton visualizar imagen
      file.previewElement.querySelector('#btn-view-image-dropzone').addEventListener('click', () => {
        window.open('', '_blank').document.body.innerHTML = '<img src="' + file.dataURL + '">';
      });

      // file.previewElement.querySelector('.btn-edit-image-dropzone').addEventListener('click', this.pruebaa.bind(this));
      // boton editar imagen
      file.previewElement.querySelector('#btn-edit-image-dropzone')?.addEventListener('click', (e) => {
        console.log(file);
        this.imageId = file.id;
        this.cropUrlImage = file.dataURLx700;
        // e.preventDefault(); // e.stopPropagation();
        this.cropimage = false;
      });

      // boton eliminar imagen
      file.previewElement.querySelector('#btn-trash-image-dropzone').addEventListener('click', (e) => {
        e.preventDefault();
        this.siteService.detimages(this.lang, this.siteId, file.id).subscribe( resp => {
        }, error => {
          console.log(error);
          alert('Problemas al eliminar imagen. Inténtelo nuevamente.');
        });
      });
    });

    if (this.helpint > 1) {
      this.getImagesStore(this.skipImage, this.takeImage, 0);
    }
    this.helpint++;

  }

  public onRemovedFile(args: any): void {
    // console.log('onRemovedFile', args);
  }

  // Aqui colocar servicio de GET obtener imagenes
  getImagesStore(skip: number, take: number, vermas: number) {
    this.buttonvermasloader = false;
    // tslint:disable-next-line: max-line-length
    this.cdRef.detectChanges(); // evitar el error del cambio buttonvermasloader en html, obliga a detectar los cambios de las variables que se usan en el html
    this.siteService.getimages(this.lang, this.siteId, skip, take).subscribe( resp => {
      if (resp.ok) {
        if (!vermas) {
          this.datainit.removeAllFiles();
        }
        const value = resp.data; let i = 0;
        if (value.length === 0) {
          this.buttonvermas = false;
        } else {
          for (let index = skip; index < (skip + value.length); index++) {
            this.datainit.emit('addedfile', value[i]);
            this.datainit.files.push(value[i]);
            this.datainit.emit('thumbnail', value[i], value[i].dataURL);
            this.datainit.emit('complete', value[i]);
            this.datainit.files[index].previewElement.querySelector('.img-dropzone-loading').classList.add('d-none');
            this.datainit.files[index].previewElement.querySelector('.img-thumbnail-preview').classList.remove('d-none');
            this.datainit.files[index].previewElement.querySelector('.dz-progress').classList.add('d-none');
            this.datainit.files[index].previewElement.querySelector('#btn-view-image-dropzone').classList.remove('disabled');
            this.datainit.files[index].previewElement.querySelector('#btn-edit-image-dropzone')?.classList.remove('disabled');
            i++;
            this.buttonvermas = true;
          }
        }
        this.buttonvermasloader = true;
        this.loadermain = true;
      }
    }, error => {
      console.log(error);
      this.loadermain = true;
    });
  }

  vermas() {
    this.skipImage = this.skipImage + this.takeImage;
    this.getImagesStore(this.skipImage, this.takeImage, 1);
  }

  back() {
    this.cropimage = true;
  }

}
