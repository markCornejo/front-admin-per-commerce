import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ResponseLoginPeruCommerce } from '../interfaces/login.interfaces';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const apiAuth = environment.apiPerAuth;

const headersToken = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('sessionlogin')).token,
});

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(siteId: number, params) {
    return this.http.post<ResponseLoginPeruCommerce>(`${apiAuth}/es/sites/${siteId}/users/login`, params);
  }

  checkToken() {
    return this.http.post<boolean>(`${apiAuth}/es/login/check`, [], {headers: headersToken})
    .pipe(
      map( resp => {
        return resp;
      }),
      catchError( err => {
        return of(false);
      })
    );
  }


}
