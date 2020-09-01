import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneComponent } from '../../components/dropzone/dropzone.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileForm: FormGroup;
  changeDomain: number;
  closeResult = '';

  constructor(
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private ngbModel: NgbModal
  ) { }

  ngOnInit(): void {

    this.changeDomain = 0; // 0 => subdomain, 1 => domain
    this.profileForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required ],
      domain: ['', Validators.required ],
      subdomain: ['', Validators.required ],
      // logo: [''],
      // favicon: [''],
    });

    // tslint:disable-next-line: no-unused-expression
    const siteId = this.route.parent.parent.snapshot.params.site_id;
    this.siteService.siteInfo(siteId).subscribe( resp => {

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
  }

  profilePlace() {

  }

  changeDom() {
    this.changeDomain = (this.changeDomain) ? 0 : 1;
  }

  openDialog() {
    const modald = this.ngbModel.open(DropzoneComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'dropzone-homemodal'
    });

    modald.componentInstance.siteId = 1;
    modald.componentInstance.lang = 'es';

    modald.result.then((result) => {
      console.log(result);
      // this.src = result.dataURL;
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
