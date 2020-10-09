import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

type typeAlert = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

  constructor() { }

  swalAlertSimple(type: typeAlert) {

    let text = '';
    switch (type) {
      case 'success':
        text = 'Success';
        break;
      case 'error':
        text = 'Error';
        break;
      case 'info':
        text = 'Information is missing';
        break;
      default:
        break;
    }

    Swal.fire({
      icon: type,
      title: `<h3>${text}</h3>`,
      timer: 1500,
      showConfirmButton: false,
      onBeforeOpen: () => {
        // Swal.showLoading()
      }
   });
  }

  swalAlertClose(){
    Swal.close();
  }

}
