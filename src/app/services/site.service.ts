import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseSiteInfo } from '../interfaces/siteIngo.interfaces';
import { Image } from '../model/image.model';

const apiGateWay = environment.apiGateWay;

const headersToken = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('sessionlogin'))?.token,
});

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private http: HttpClient,
  ) { }

  siteInfo(lang, siteId: number) {
    return this.http.get<ResponseSiteInfo>(`${apiGateWay}/${lang}/admin/sites/${siteId}`, {headers: headersToken});
  }

  getimages(lang, siteId: number, skip: number, take: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Image>(`${apiGateWay}/${lang}/admin/sites/${siteId}/images?skip_image=${skip}&take_image=${take}`, {headers: headersToken});
  }

  detimages(lang, siteId: number, imageId: number) {
    return this.http.delete(`${apiGateWay}/${lang}/admin/sites/${siteId}/images/${imageId}`, {headers: headersToken});
  }

  editCropperImage(lang, siteId: number, imageId: number, data) {
    return this.http.put(`${apiGateWay}/${lang}/admin/sites/${siteId}/images/${imageId}/cropper`, data, {headers: headersToken});
  }

}
