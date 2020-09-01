import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseSiteInfo } from '../interfaces/siteIngo.interfaces';
import { Image } from '../model/image.model';

const apiGateWay = environment.apiGateWay;

const headersToken = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('sessionlogin')).token,
});

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private http: HttpClient,
  ) { }

  siteInfo(siteId: number) {
    return this.http.get<ResponseSiteInfo>(`${apiGateWay}/es/admin/sites/${siteId}`, {headers: headersToken});
  }

  getimages(lang, siteId: number) {
    return this.http.get<Image>(`${apiGateWay}/${lang}/admin/sites/${siteId}/images`, {headers: headersToken});
  }

  detimages(lang, siteId: number, imageId: number) {
    return this.http.delete(`${apiGateWay}/${lang}/admin/sites/${siteId}/images/${imageId}`, {headers: headersToken});
  }

}
