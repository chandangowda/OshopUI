import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CategoryResponse } from 'src/model/categoryResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllCategory():Observable<CategoryResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.get<CategoryResponse>('http://35.200.215.246:8777/product-api/category/getall/',options)
  }

  getSingleCategory(catid):Observable<CategoryResponse>{
    let token=this.cookieService.get('access_token');  
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + token });
    let options: {
      headers?: HttpHeaders
    } = {
      headers: headers
    };

    return this.http.get<CategoryResponse>('http://35.200.215.246:8777/product-api/category/getbycatgory/'+catid,options)
  }


}
