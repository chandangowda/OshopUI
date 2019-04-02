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
    let userData= localStorage.getItem('user');
    console.log(userData);
    this.user={... JSON.parse(userData)}
    
    let gmail=this.makeid(5)+"@gmail.com"
     this.user['userEmail']=gmail;
     this.user['role']='admin';
     localStorage.setItem('user',this.user);
    this.http.post('http://35.200.215.246:8777/user-api/user/saveuser',this.user,options)
      .subscribe(res=>console.log(res));
  }

   makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
}
