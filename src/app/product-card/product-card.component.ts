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
  

    for(let i=0;i<this.shoppingCart.items.length;i++){
      if(this.shoppingCart.items[i].productId === this.product.id){
        
        return this.shoppingCart.items[i].cartCount ?this.shoppingCart.items[i].cartCount:0;
      }
    }
   
     
    
    
  }

  ngOnInit() {
  }

}
