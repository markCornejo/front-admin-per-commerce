import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructureComponent } from './structure.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes =
[
  { path: '', redirectTo: 'admin', pathMatch: 'full'},
  // { path: 'estructura', component: EstructuraComponent}
  { path: ':site_id', component: StructureComponent,
    children: [
      {path: 'home', loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)},
    ]
  },
  { path: 'header', component: HeaderComponent}
];
// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule { }
