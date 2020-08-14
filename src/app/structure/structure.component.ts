import { Component, OnInit } from '@angular/core';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  constructor(
    private siteService: SiteService,
  ) { }

  ngOnInit(): void {

  }

}
