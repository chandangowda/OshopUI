import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/shared/model/item';
import { OrderService } from 'src/app/shared/services/order.service';
import { Product } from 'src/app/shared/model/product';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { User } from 'src/app/shared/model/user';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  shipping = {};
  @Input("shopping-cart")shoppingCart:ShoppingCart;
  items: Item[];
  product: Product[];

  constructor(private orderService: OrderService, 
    private shopingCartService: ShoppingCartService,
    private productService: ProductService,
    private router:Router,
    private sharedService:SharedService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.items = this.shoppingCart.items;
    let itemId:string[]=[];
    this.items.forEach(element => {
      itemId.push(element.productId);
      this.productService.getProductByIds(itemId).subscribe(res => this.product = res.productResponseList);
    })
  }  

  placeOrder(shippingData) {
    let userData:User=JSON.parse(localStorage.getItem('user'));

    let order = {
      userId:userData.userName,
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

    this.orderService.saveOrder(order).subscribe(res => console.log());
    this.shopingCartService.clearCart().then(res => {
      res.subscribe(response => {
        console.log()
      })
    });
    this.sharedService.changeShoppingCart(new ShoppingCart());
    this.router.navigate(['/order-success']);
  }

  getTotalPrice(productId, cartCount) {
    for (let i = 0; i < this.product.length; i++) {
      let singleProduct = this.product[i]
      if (singleProduct.id === productId) {
        return singleProduct.price * cartCount;
      }
    }
  }

}
