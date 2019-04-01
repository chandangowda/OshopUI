import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from './util/shared.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     
     constructor(private sharedServ: SharedService,private route:Router,private userService:UserService){
      sharedServ.currentTokenValue.subscribe(flag =>{
        
        if(flag){
            userService.saveUser();
            let returnUrl=localStorage.getItem('returnUrl');
            route.navigateByUrl(returnUrl);
        }
      });
      
     }

    
}
