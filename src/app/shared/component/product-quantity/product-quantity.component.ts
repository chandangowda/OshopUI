import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/model/product';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import {take } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product')product:Product;
  @Input('shoping-cart')shoppingCart:ShoppingCart;
  countNumber:number;

  
  addToCart(){
    this.cartService.addToCart(this.product).then(res=>{
        res.pipe(take(1)).subscribe(response=>{
          this.shoppingCart=response.cartData[0];
          this.sharedService.changeShoppingCart( this.shoppingCart);
          this.getQuantity();
        })
    });
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product).then(res =>{
      res.subscribe(response =>{
        this.shoppingCart=response.cartData[0];
        this.sharedService.changeShoppingCart( this.shoppingCart);
        this.getQuantity();
      })
    });
  }

  getQuantity(){
     
    if(!this.shoppingCart) {
       this.countNumber=0;
       return this.countNumber;
     };
  

    for(let i=0;i<this.shoppingCart.items.length;i++){
      if(this.shoppingCart.items[i].productId === this.product.id){
        this.shoppingCart.items[i].cartCount ?this.countNumber=this.shoppingCart.items[i].cartCount:this.countNumber=0;
        return this.countNumber
      }
    }
    this.countNumber=0;
    return this.countNumber;
   
     
    
    
  }


  constructor(private cartService:ShoppingCartService,private sharedService:SharedService) { }

  ngOnInit() {
  }

}
