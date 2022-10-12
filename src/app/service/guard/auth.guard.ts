import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import StorageHelper from 'src/app/libs/helpers/storage.helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let session = StorageHelper.getItem('session');
      if(session===null && state.url.includes('search')) {
        this.router.navigate(['login'])
      }
      if(session!==null && state.url.includes('login')){
        this.router.navigate(['search'])
      }
    return true;
  }
  
}
