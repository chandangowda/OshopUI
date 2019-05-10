import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ShoppingCartResponse } from 'src/model/shoppingCartResponse';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  create():Observable<ShoppingCartResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.post<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/savecart',{dateCreated:new Date().getTime()},options)

  }
  
}
