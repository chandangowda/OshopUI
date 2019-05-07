import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories: Category[];
  @Input("category")category:string;

  constructor( categoryService: CategoryService) {
    categoryService.getAllCategory().subscribe(response => {
      this.categories = response.categoryres;
    })
   }

  ngOnInit() {
  }

}
