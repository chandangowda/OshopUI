import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {  Router } from '@angular/router';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private cookieService: CookieService,private route:Router) { }

   obtainAccessToken(loginData) {
    
    let params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'client_id');

    let headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("client_id:secret") });
    let options = {
      headers: headers
    }
    

    this.http.post("http://35.200.215.246:8777/auth-api/oauth/token",params.toString(),options)
    .subscribe(response=>this.saveTokenData(response));
    

  }

  saveTokenData(tokenData){
    var expireDate = new Date().getTime() + (1000 * tokenData.expires_in);
    this.cookieService.set("access_token", tokenData.access_token, expireDate);
    this.callGetCall();
    this.route.navigate(['/']);
  }

  callGetCall(){
    let token=this.cookieService.get("access_token");
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token,responseType: 'text' });
    let options: {
      headers?: HttpHeaders,
      responseType: 'text',
  } = {
      headers: headers,
      responseType: 'text'
  };

    this.http.get('http://35.200.215.246:8777/product-api/test123',options)
   
    .subscribe(res =>console.log(res))
  }
}
