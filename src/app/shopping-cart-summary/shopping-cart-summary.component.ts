import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/model/shoppingCart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('shoping-cart') shoppingCart: ShoppingCart;
  countNumber: number;
  constructor() { }

  ngOnInit() {
  }

  getQuantity() {
    if (!this.shoppingCart) {
      this.countNumber = 0;
      return this.countNumber;
    };
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      this.shoppingCart.items[i].cartCount ? this.countNumber = this.shoppingCart.items[i].cartCount : this.countNumber = 0;
      return this.countNumber
    }
    this.countNumber = 0;
    return this.countNumber;
  }

}
