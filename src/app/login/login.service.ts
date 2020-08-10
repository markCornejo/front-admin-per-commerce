import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ResponseLoginPeruCommerce } from '../interfaces/login.interfaces';

const apiAuth = environment.apiPerAuth;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // Authorization: 'Bearer '+sessionStorage.getItem('token'),
  // observe:'response' as 'response'
};

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

  setStorateLogin(data: any){
    localStorage.setItem('sessionlogin', data);
  }


}
