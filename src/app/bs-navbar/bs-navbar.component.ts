import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../util/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  tokenValue:boolean;

  constructor(private authService:AuthService,private cookieService: CookieService,private data: SharedService,private route:Router) { }

  ngOnInit() {
    
    this.data.currentTokenValue.subscribe(flag=>{
    this.tokenValue=flag})
  }

  
  

  logout(){
    
    this.authService.logout();
    this.data.changeflag(false);
    this.route.navigate(['/login']);
  }

}
