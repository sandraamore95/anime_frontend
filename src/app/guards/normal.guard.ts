
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {

  constructor(private storageservice:StorageService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.storageservice.getUserRole() );
    if(this.storageservice.isLoggedIn() && this.storageservice.getUserRole() == 'ROLE_USER'){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}
