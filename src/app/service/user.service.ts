import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  saveUser(){
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };
    this.user= localStorage.getItem('user');
    this.http.post('http://35.200.215.246:8777/user-api/user/saveuser',this.user,options)
      .subscribe(res=>console.log(res));
  }
}
