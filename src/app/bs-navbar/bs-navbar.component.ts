import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../util/shared.service';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  tokenValue: boolean;
  user: User;
  adminFlag: boolean = false;

  constructor(private authService: AuthService, private cookieService: CookieService, private data: SharedService, private route: Router) { }

  ngOnInit() {

    this.data.currentTokenValue.subscribe(flag => {
      this.tokenValue = flag
      let response:Subscription;

      if(flag){
        this.authService.appUser().subscribe(userResponse=>{
          if(userResponse.userList[0].role  && 'admin' === userResponse.userList[0].role){
            this.adminFlag=true;
          }
          this.user=userResponse.userList[0];
        }) 
      }

      
      
    
    
    });



    

    

  }




  logout() {
    this.authService.logout();
    this.data.changeflag(false);
    this.route.navigate(['/login']);
  }

}
