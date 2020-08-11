import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'front-peru-commerce';

  constructor() {
    // const dato = localStorage.getItem('sessionlogin');
    // console.log(JSON.parse(dato).token);
  }

  ngOnInit() {

  }

}
