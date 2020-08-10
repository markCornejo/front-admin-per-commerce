import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureComponent } from './structure.component';
import { EstructuraRoutingModule } from './structure-routing.module';



@NgModule({
  declarations: [StructureComponent],
  imports: [
    CommonModule,
    EstructuraRoutingModule
  ]
})
export class StructureModule { }
