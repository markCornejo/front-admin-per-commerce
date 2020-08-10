import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as ui from '../services/redux/ui.actions';
import * as login from './login.actions';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  loginSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private formBuild: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    });

    // tslint:disable-next-line: no-shadowed-variable
    this.loginSubscription = this.store.select('ui').subscribe( ui => {this.cargando = ui.isLoading; /*console.log('cargandoo');*/ } );
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  login() {

    this.cargando = true;
    const siteId = 2;
    const params = this.loginForm.value;

    this.store.dispatch(ui.isLoading());

    // servicio
    this.loginService.login(siteId, params).subscribe( resp => {

      if (resp.ok) {
        const data = resp.data;
        this.store.dispatch(login.setUser({user: data})); // registrar user en store redux
        this.store.dispatch(ui.stopLoading()); // cambiar estado de loader
        this.responseDataSuccess(data);
        this.router.navigate(['/mstructure/structure']);
      }
    }, error => {
      console.log(error);
      this.store.dispatch( ui.stopLoading());
      this.cargando = false;
    });

  }

  /**
   *
   *
   * @private
   * @param {*} resp
   * @memberof LoginComponent
   */
  private responseDataSuccess(data: any) {

    this.loginService.setStorateLogin(data); // crear localstorage

  }

}
