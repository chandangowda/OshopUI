import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/model/product';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';
import {take } from 'rxjs/operators';



@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')product:Product=new Product();
  @Input('show-actions')showActions:boolean=true;
  @Input('shoping-cart')shoppingCart:ShoppingCart;
  countNumber:number;

  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product).then(res=>{
        res.pipe(take(1)).subscribe(response=>{
          this.shoppingCart=response.cartData[0];
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

  ngOnInit() {
  }

}
