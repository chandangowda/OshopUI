import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductCardComponent } from 'src/app/shared/component/product-card/product-card.component';
import { ProductQuantityComponent } from 'src/app/shared/component/product-quantity/product-quantity.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular7-data-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    DataTableModule.forRoot().providers,
  ],
  providers:[
    AuthService, 
    CookieService, 
    SharedService, 
    UserService, 
    AuthGuardService, 
    CategoryService,
    ProductService,
    OrderService
  ]
})
export class SharedModule { }
