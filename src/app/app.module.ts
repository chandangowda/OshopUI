import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular7-data-table';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { MaterialModule } from './material/material.module';
import { ProductsComponent } from './shopping/component/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductsComponent },
];
@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],

  providers: [
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
