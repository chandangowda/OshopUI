import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular7-data-table';
import { CustomFormsModule } from 'ng2-validation';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminModule } from './admin/admin.module';









const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  

];
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,

  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CustomFormsModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],

  providers: [
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
