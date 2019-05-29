import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';
import { Item } from 'src/app/shared/model/item';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/model/product';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartCount: number;
  items: Item[];
  product: Product[];
  productTotalprice: number;
  shoppingcart: ShoppingCart;


  constructor(private shopingCartService: ShoppingCartService,
    private productService: ProductService,private sharedService:SharedService) { }

  async  ngOnInit() {
    let cartres = await this.shopingCartService.getCart();

    cartres.subscribe(cart => {
      this.shoppingcart = cart.cartData[0];
      this.shoppingCartCount = 0;
      this.items = this.shoppingcart.items;
      let ids: string[] = [];

      this.shoppingcart.items.forEach(element => {
        this.shoppingCartCount += element.cartCount;
        ids.push(element.productId);
      })

      this.productService.getProductByIds(ids).subscribe(res => this.product = res.productResponseList);

    })
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
    this.productTotalprice = 0;
    for (let i = 0; i < this.product.length; i++) {
      let singleProduct = this.product[i]
      if (singleProduct.id === productid) {
        this.productTotalprice = singleProduct.price * quantity;
        return this.productTotalprice;
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

  getProductById(productId) {
    for (let i = 0; i < this.product.length; i++) {
      let singleProduct = this.product[i]
      if (singleProduct.id === productId) {
        return singleProduct;
      }
    }
  }


  async  clearCart() {
    let res = await this.shopingCartService.clearCart();
    res.subscribe(response => {
      console.log(response);
    })
    this.sharedService.changeShoppingCart(new ShoppingCart());
  }
  

}
