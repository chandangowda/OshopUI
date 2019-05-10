import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/model/product';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')product:Product;
  @Input('show-actions')showActions:boolean=true;

  constructor(private cartService:ShoppingCartService) { }

  addToCart(product:Product){
      let cartid=localStorage.getItem('cartId');
      console.log('product')
      if(!cartid){
        this.cartService.create().subscribe(res=>{
          cartid=res.cartData[0].id;
          localStorage.setItem('cartId',cartid);
        });
        
      }else{

      }
  }

  ngOnInit() {
  }

}
