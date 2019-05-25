import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderResponse } from 'src/model/orderResponse';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  saveOrder(order):Observable<OrderResponse>{

    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.post<OrderResponse>('http://localhost:8777/product-api/order/saveOrder',order,options)

  }

  getOrder():Observable<OrderResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    let userData:User=JSON.parse(localStorage.getItem('user'));

    return this.http.get<OrderResponse>('http://localhost:8777/product-api/order/getorderbuserid/'+userData.userName,options);

  }

  getAllOrder():Observable<OrderResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    
    return this.http.get<OrderResponse>('http://localhost:8777/product-api/order/getorders',options);

  }


}
