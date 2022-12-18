import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { NavigationService } from './services/navigation.service';
import { UtilityService } from './services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild {

  urlPath: any;

  isLoggedIn$: Observable<boolean[]>;
  isLoggedIn: boolean;

  constructor(
    private navigation: NavigationService,
    private store: Store,
    private utility: UtilityService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState();
  }
  checkAuthState(): boolean {
    this.isLoggedIn = this.store.selectSnapshot<boolean>((state) => state.authState.isLoggedIn);
    if (!this.isLoggedIn) {
      // console.log('isLoggedIn', this.isLoggedIn);
      return false;
    }
    return true;
  }
}
