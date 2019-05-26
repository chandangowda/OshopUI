import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/shared/model/userResponse';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any={};


  constructor(private http: HttpClient, 
    private cookieService: CookieService,
    private route:Router,
    private data: SharedService,
    private userService:UserService
    ) { }

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
    this.http.post("http://localhost:8777/auth-api/oauth/token", params.toString(), options)
      .subscribe(response => {
        
        let userInfo:User=new User();
        userInfo.userName=loginData.username;
       // let gmail=this.makeid(5)+"@gmail.com"
       userInfo.userEmail='zvDSy@gmail.com';
      
        localStorage.setItem('user',JSON.stringify(userInfo));
        this.saveToken(response);      
      });

     
      

  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    localStorage.setItem('access_token',token.access_token);
    this.data.changeflag(true);
  }

  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
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
    this.http.get('http://localhost:8777/product-api/test123',options)
      .subscribe(res=>console.log(res));
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user')
    this.cookieService.delete('access_token');
  }

   appUser() :Observable<UserResponse>{
    return this.userService.getUser()
  }
}
