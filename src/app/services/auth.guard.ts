import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  canActivate(): Observable<boolean> {

    return this.loginService.checkToken().pipe(
      tap( state => {
        if (!state) {
          this.router.navigate(['/mlogin/login']);
        }
      })
    );
    // return true;
  }

}
