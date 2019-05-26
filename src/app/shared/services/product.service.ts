import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/shared/model/product';
import { ProductResponse } from 'src/app/shared/model/productResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  saveProduct(product:Product){
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.post('http://localhost:8777/product-api/product/saveproduct/',product,options)
  }

  getAll():Observable<ProductResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };
    return this.http.post<ProductResponse>('http://localhost:8777/product-api/product/getallproduct',{},options)
  }

  getProductById(id):Observable<ProductResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };
    return this.http.get<ProductResponse>('http://localhost:8777/product-api/product/getproduct/'+id,options)
  }

  updateProduct(product:Product){
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.post('http://localhost:8777/product-api/product/updateProduct',product,options)
  }

  deleteProduct(productid:string){
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.delete('http://localhost:8777/product-api/product/deleteproduct?productid='+productid,options)
  }


  getProductByIds(id):Observable<ProductResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };
    return this.http.post<ProductResponse>('http://localhost:8777/product-api/product/getproducts/',id,options)
  }

  
}
