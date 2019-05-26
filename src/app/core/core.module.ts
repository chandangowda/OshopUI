import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
 
];
@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
