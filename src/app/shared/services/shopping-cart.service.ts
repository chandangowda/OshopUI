import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ShoppingCartResponse } from 'src/app/shared/model/shoppingCartResponse';
import { Product } from 'src/app/shared/model/product';



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

  async removeFromCart(product:Product):Promise<Observable<ShoppingCartResponse>>{
    console.log('remobe')
    let cartId= await   this.getOrCreateCartId();
    
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.delete<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/deleteProductById/'+cartId+'/'+product.id,options)

  }

   async  getCart() :Promise<Observable<ShoppingCartResponse>>{

     
    let cartId= await   this.getOrCreateCartId();
      
    
      let token=this.cookieService.get('access_token');  
      let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
      let options: {
        headers?: HttpHeaders
      } = {
        headers: headers
      };
      return this.http.get<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/getcart/'+cartId,options);
  
    
    
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
  
     return this.http.post<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/findbycartproid/'+cartId+'/'+product.id,{},options)
    }

    async clearCart(){
      let cartId=await this.getOrCreateCartId();
      let token=this.cookieService.get('access_token');  
      let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
      let options: {
        headers?: HttpHeaders
      } = {
        headers: headers
      };
      return this.http.delete<ShoppingCartResponse>('http://localhost:8777/product-api/shoppingcart/clearProductById/'+cartId,options);
  
    
    }
  
}
