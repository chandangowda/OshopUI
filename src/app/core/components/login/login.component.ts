import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService:AuthService,
    private route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService,
    private sharedService:SharedService) { }

  ngOnInit() {
  }

  submit(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.authService.obtainAccessToken(this.form.value);
    if(localStorage.getItem('access_token')){
      let cartres=this.shoppingCartService.getCart();
      cartres.then(cart=>{
          cart.pipe(take(1)).subscribe(res=>{
                 this.sharedService.changeShoppingCart(res.cartData[0]);
          });
      })
    }
   
  }

}
