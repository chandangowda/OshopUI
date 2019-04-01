import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedService } from '../util/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any={};


  constructor(private http: HttpClient, private cookieService: CookieService,private route:Router,private data: SharedService) { }

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
    this.http.post("http://35.200.215.246:8777/auth-api/oauth/token", params.toString(), options)
      .subscribe(response => {
        this.saveToken(response);    
      });

      this.user['userName']=loginData.username;
      this.user['userEmail']='abc@gmail.com';
      localStorage.setItem('user',JSON.stringify(this.user));
      

  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    localStorage.setItem('access_token',token.access_token);
    this.data.changeflag(true);
  }

  callGet() {
    let token=this.cookieService.get('access_token');
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders,
      responseType: 'text',
    } = {
      headers: headers,
      responseType: 'text'
    };
    this.http.get('http://35.200.215.246:8777/product-api/test123',options)
      .subscribe(res=>console.log(res));
  }

  logout(){
    this.cookieService.delete('access_token');

  }
}
