import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/model/product';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCart } from 'src/model/shoppingCart';
import { Item } from 'src/model/item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')product:Product;
  @Input('show-actions')showActions:boolean=true;
  @Input('shoping-cart')shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  addToCart(product:Product){
    this.cartService.addToCart(product);
  }

  getQuantity(){

    if(!this.shoppingCart) return 0;
    let item=null;

    item=this.shoppingCart.items.forEach(element =>{
      if(element.productId === this.product.id){
               return element;
      } 
    })

    return item ? item.cartCount:0;
  }

  ngOnInit() {
  }

}
