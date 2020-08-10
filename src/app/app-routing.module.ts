
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginModule } from './login/login.module';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'mlogin', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'mstructure',
    loadChildren: () => import('./structure/structure.module').then(m => m.StructureModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
