import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/model/product';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  product: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>
  items: Product[]=[];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(productResponse => {
      this.product = productResponse.productResponseList
      this.initializeTable(productResponse.productResponseList);
    });

  }

  reloadItems(event){
    if(!this.tableResource) return;
    this.tableResource.query(event)
    .then(items => this.items = items)
  }


  private initializeTable(product: Product[]) {
    this.tableResource = new DataTableResource(product);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items)
    this.tableResource.count()
      .then(count => this.itemCount = count)
  }
  filter(query: string) {

    let filteredProduct = (query) ?
      this.product.filter(p => {
        return p.title.toLowerCase().includes(query.toLowerCase())
      }) : this.product;

      this.initializeTable(filteredProduct);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
