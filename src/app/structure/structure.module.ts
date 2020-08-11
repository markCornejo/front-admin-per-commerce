import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureComponent } from './structure.component';
import { EstructuraRoutingModule } from './structure-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [StructureComponent, HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    EstructuraRoutingModule
  ]
})
export class StructureModule { }
