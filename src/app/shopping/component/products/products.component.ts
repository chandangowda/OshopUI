import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/model/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/model/shoppingCart';

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
    private productServicec: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService:ShoppingCartService) {
      
   
  }

  ngOnInit() {
    this.shoppingCartService.getCart().then(res=>res.subscribe(response=>{
      this.cart=response.cartData[0];
    }));
     this.populateProduct();
   
  }

  private populateProduct(){
    this.productServicec.getAll().pipe(
      switchMap(res => {
        this.product = res.productResponseList
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
  }
  private applyFilter(){
    this.filteredProduct = this.category ? this.product.filter(p => p.category === this.category) : this.product;

  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
   
  }

}
