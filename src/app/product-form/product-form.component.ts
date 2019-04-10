import { Component, OnInit, ɵConsole } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories:Category[];

  constructor(categoryService:CategoryService) {
    categoryService.getAllCategory().subscribe(response=>{ 
          this.categories=response.categoryres;
    })
   }

   save(product:Product){
      console.log(product)
   }

  ngOnInit() {
  }

}
