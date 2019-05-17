import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from 'src/model/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/model/shoppingCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  product: Product[] = [];
  category: string;
  filteredProduct: Product[];
  cart:ShoppingCart;
  subscription:Subscription;

  constructor(
    productServicec: ProductService,
    route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService) {
      
    productServicec.getAll().pipe(
      switchMap(res => {
        this.product = res.productResponseList
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProduct = this.category ? this.product.filter(p => p.category === this.category) : this.product;
      })
  }

  ngOnInit() {
    this.shoppingCartService.getCart().then(res=>res.subscribe(response=>{
      this.cart=response.cartData[0];
    }));
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
   
  }

}
