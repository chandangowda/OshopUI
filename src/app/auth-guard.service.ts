import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';
import { SharedService } from './util/shared.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  tokenValue: boolean = false;
  constructor(private route: Router, private sharedService: SharedService, ) {

  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.sharedService.currentTokenValue.subscribe(flag => {

      this.tokenValue = flag
    })


    if (this.tokenValue) {
      return true;
    }

    this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;


  }
}
