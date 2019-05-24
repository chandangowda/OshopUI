import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCart } from 'src/model/shoppingCart';
import { Subscription } from 'rxjs';
import { Item } from 'src/model/item';
import { Product } from 'src/model/product';
import { ProductService } from '../service/product.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {}
  shoppingcart: ShoppingCart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService
    , private productService: ProductService,
    private orderService:OrderService,
    private shopingCartService:ShoppingCartService) { }

  async ngOnInit() {
    let cartres = await this.shoppingCartService.getCart();
    this.subscription = cartres.subscribe(cart => {
      this.shoppingcart = cart.cartData[0];
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

 

}
