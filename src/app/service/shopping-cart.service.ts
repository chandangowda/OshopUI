import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ShoppingCartResponse } from 'src/model/shoppingCartResponse';
import { Product } from 'src/model/product';
import {take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private create():Observable<ShoppingCartResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.post<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/savecart',{dateCreated:new Date().getTime()},options)

  }

    getCart():Observable<ShoppingCartResponse>{
    let cartId=  this.getOrCreateCartId();
    let cartNum;
    cartId.then(res=>{
      cartNum=res;
    })

    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };
    return this.http.get<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/getcart'+cartNum,options);

   

    

  }

  private async getOrCreateCartId(){
    let cartid=localStorage.getItem('cartId');

    if(cartid) return cartid;
    
      let result=await this.create();
      result.subscribe(res=>{
        cartid=res.cartData[0].id;
        localStorage.setItem('cartId',cartid);
        return cartid;
      });
      
   
    
  }


  async addToCart(product:Product){
      let cartId=await this.getOrCreateCartId();
      let token=this.cookieService.get('access_token');  
      let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
      let options: {
        headers?: HttpHeaders
      } = {
        headers: headers
      };
  
      let cartResponse=this.http.post<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/findbycartproid/'+cartId+'/'+product.id,{},options)
      cartResponse.pipe(take(1)).subscribe(res=>console.log(res));
    }
  
}
