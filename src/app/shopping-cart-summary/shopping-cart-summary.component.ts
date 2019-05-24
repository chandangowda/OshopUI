import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/model/shoppingCart';
import { Product } from 'src/model/product';
import { ProductService } from '../service/product.service';
import { Item } from 'src/model/item';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input('shoping-cart') shoppingCart: ShoppingCart;
  countNumber: number;
  product: Product[];
  items: Item[];
  constructor(private productService: ProductService) { }

  ngOnChanges() {
    let itemId: string[] = [];
    this.items = this.shoppingCart.items;
    this.items.forEach(element => {
      itemId.push(element.productId);
      this.productService.getProductByIds(itemId).subscribe(res => this.product = res.productResponseList);
    })
  }

  getQuantity() {
    this.countNumber = 0;
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      this.countNumber++;
    }
    return this.countNumber;
  }

  getProductTitle(productId) {
    for (let i = 0; i < this.product.length; i++) {
      let singleProduct = this.product[i]
      if (singleProduct.id === productId) {
        return singleProduct.title;
      }
    }
  }

  getTotalCount(productid, quantity) {
    let productTotalprice = 0;
    for (let i = 0; i < this.product.length; i++) {
      let singleProduct = this.product[i]
      if (singleProduct.id === productid) {
         productTotalprice = singleProduct.price * quantity;
        return productTotalprice;
      }
    }
  }

  getCartCount() {
    let count = 0;
    this.items.forEach(element => {
      count += this.getTotalCount(element.productId, element.cartCount);
    })
    return count;

  }

}
