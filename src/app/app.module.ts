import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { SharedService } from './util/shared.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './service/user.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';







const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },


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
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],

  providers: [
    AuthService, 
    CookieService, 
    SharedService, 
    UserService, 
    AuthGuardService, 
    AdminAuthGuardService,
    CategoryService,
    ProductService
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
