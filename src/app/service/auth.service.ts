import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   obtainAccessToken(loginData) {
     console.log(loginData);
    let params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'client_id');

    let headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("client_id:secret") });
    let options = {
      headers: headers
    }
    

    this.http.post("http://localhost:8777/auth-api/oauth/token",params.toString(),options)
    .subscribe(response=>console.log(response));

  }
}
