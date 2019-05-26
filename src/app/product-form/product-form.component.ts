import { Component, OnInit, ɵConsole } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/model/category';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: Category[];
  product: Product = new Product();
  id: string;

  constructor(categoryService: CategoryService
    , private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    categoryService.getAllCategory().subscribe(response => {
      this.categories = response.categoryres;
    })
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProductById(this.id).pipe(take(1)).subscribe(response => this.product = response.productResponseList[0]);
    }
  }

  save(product: Product) {
    if (this.id) {
      product.id = this.id;
      this.productService.updateProduct(product).subscribe(res => console.log(res));
    } else {
      this.productService.saveProduct(product).subscribe(res => console.log(res));

    }
    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(this.id).subscribe(res=>console.log(res));
    this.router.navigate(['/admin/products'])
  }

  ngOnInit() {
  }

}
