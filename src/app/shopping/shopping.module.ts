import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { ProductFilterComponent } from './component/products/product-filter/product-filter.component';
import { ProductsComponent } from './component/products/products.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './component/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ShoppingModule { }
