import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from 'src/model/product';
import { CategoryService } from '../service/category.service';
import { Category } from 'src/model/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product:Product[];
  categories: Category[];
  
  constructor(productServicec:ProductService,categoryService: CategoryService) {
       productServicec.getAll().subscribe(res=>this.product=res.productResponseList);
       categoryService.getAllCategory().subscribe(response => {
        this.categories = response.categoryres;
      })
   }

  ngOnInit() {
  }

}
