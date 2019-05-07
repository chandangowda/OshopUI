import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from 'src/model/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: Product[] = [];
  category: string;
  filteredProduct: Product[];

  constructor(
    productServicec: ProductService,
    route: ActivatedRoute) {
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
  }

}
