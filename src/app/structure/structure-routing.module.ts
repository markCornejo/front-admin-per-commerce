import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructureComponent } from './structure.component';


const routes: Routes =
[
  { path: '', redirectTo: 'structure', pathMatch: 'full'},
  // { path: 'estructura', component: EstructuraComponent}
  { path: 'structure', component: StructureComponent,}
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule { }
