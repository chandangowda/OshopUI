import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../util/shared.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  tokenValue: boolean;
  user: User;
  adminFlag: boolean = false;
   shoppingCartCount:number;

  constructor(private authService: AuthService, 
    private cookieService: CookieService, 
    private data: SharedService,
     private route: Router,
     private shoppingCartService:ShoppingCartService) { }

   async ngOnInit() {

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

       let cartres=await this.shoppingCartService.getCart();

       cartres.subscribe(cart=>{
           let  shoppingcart:ShoppingCart =cart.cartData[0];
           this.shoppingCartCount=0;
           shoppingcart.items.forEach(element=>{
             this.shoppingCartCount+=element.cartCount;
           })
       })

    

  }




  logout() {
    this.authService.logout();
    this.data.changeflag(false);
    this.route.navigate(['/login']);
  }

}
