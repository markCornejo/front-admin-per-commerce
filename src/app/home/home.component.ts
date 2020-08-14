import { Component, OnInit } from '@angular/core';
import { SiteService } from '../services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileForm: FormGroup;
  changeDomain: number;

  constructor(
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
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

}
