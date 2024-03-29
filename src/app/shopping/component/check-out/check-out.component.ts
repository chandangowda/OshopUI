import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/shared/model/item';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { OrderService } from 'src/app/shared/services/order.service';

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
