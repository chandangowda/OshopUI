import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable,of, BehaviorSubject } from 'rxjs';
import { map,switchMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {


  

  constructor(private sharedServ: SharedService,
    private userService:UserService,private router:Router,
    private authService:AuthService) { }

  canActivate(){
   
    return this.authService.appUser().pipe(map(user => {
     
      if (user.userList[0] && user.userList[0].role && user.userList[0].role==='admin') {
          return true;
      }else{
        this.router.navigate(['/']);
        return false;
      }
  })).pipe(catchError(() => {
      this.router.navigate(['/']);
      return of(false);
  }));
    
    
 }
}
