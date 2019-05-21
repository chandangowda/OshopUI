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
  items: Item[];
  product: Product[];

  constructor(private shoppingCartService: ShoppingCartService
    , private productService: ProductService,
    private orderService:OrderService) { }

  async ngOnInit() {
    let cartres = await this.shoppingCartService.getCart();

    this.subscription = cartres.subscribe(cart => {
      this.shoppingcart = cart.cartData[0];
      this.items = this.shoppingcart.items;
      let ids: string[] = [];

      this.shoppingcart.items.forEach(element => {
        ids.push(element.productId);
      })

      this.productService.getProductByIds(ids).subscribe(res => this.product = res.productResponseList);
    })

  }

  placeOrder(shippingData) {
   
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      item: this.items.map(element => {
        return {
          productId: element.productId,
          cartCount: element.cartCount,
          totalPrice: this.getTotalPrice(element.productId, element.cartCount)
        }
      })

    }

    this.orderService.saveOrder(order).subscribe(res=>console.log());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalPrice(productId, cartCount) {
    let productTotalprice = 0;
    for (let i = 0; i < this.product.length; i++) {
      let singleProduct = this.product[i]
      if (singleProduct.id === productId) {
        return singleProduct.price * cartCount;
      }
    }
  }

}
