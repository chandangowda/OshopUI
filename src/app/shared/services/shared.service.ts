import { Injectable } from '@angular/core';
  
import {BehaviorSubject} from 'rxjs';
import { ShoppingCart } from '../model/shoppingCart';
import { ShoppingCartService } from './shopping-cart.service';
import {take} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<boolean>(false);
  private shoppingCart=new BehaviorSubject<ShoppingCart>(new ShoppingCart());
  currentTokenValue = this.messageSource.asObservable();
  currentShoopingValue=this.shoppingCart.asObservable();
  constructor() {}  

  changeflag(token: boolean) {
    this.messageSource.next(token);
  }

  changeShoppingCart(shoppingCartChange:ShoppingCart){
      this.shoppingCart.next(shoppingCartChange);
  }
}
