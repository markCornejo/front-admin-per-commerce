import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiGateWay = environment.apiGateWay;

const headersToken = new HttpHeaders({
  'Content-Type': 'application/json',
  // tslint:disable-next-line: max-line-length
  Authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('sessionlogin')) ? JSON.parse(localStorage.getItem('sessionlogin')).token : ''),
});

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
  ) { }

  getUbigeo(lang, siteId: number, cod: string) {
    // tslint:disable-next-line: max-line-length
    let queryString = '';
    if (cod !== '') {
      queryString = '?cod=' + cod;
    }

    return this.http.get(`${apiGateWay}/${lang}/admin/sites/${siteId}/ubigeo${queryString}`, {headers: headersToken});
  }

}
