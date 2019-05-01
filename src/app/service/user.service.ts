import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';
import { UserResponse } from 'src/model/userResponse';

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
    
    
     this.user['role']='admin';
    // this.user['zvDSy@gmail.com']='';
     localStorage.setItem('user',this.user);
    this.http.post('http://localhost:8777/user-api/user/saveuser',this.user,options)
      .subscribe(res=>console.log(res));
  }

  getUser():Observable<UserResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };
    let userData:User=JSON.parse(localStorage.getItem('user'));
    
    return this.http.post<UserResponse>('http://localhost:8777/user-api/user/getuser',userData,options)
      ;

  }

  
  
}
