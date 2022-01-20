import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiInterceptor } from '../interceptor/api.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  urlApiLogin: string = "/api/login";
  urlApiSignin: string = "/api/signin";

  constructor(private Http: HttpClient) { }

  
  public postLogin(login: string, password: string): Observable<Users>{
    let data: string = "login=" + login + "&password=" + password;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };

    return this.Http.post<Users>(this.urlApiLogin, data, httpOptions);
  }

  public postSignin(login:string, password:string, prenom:string, nom:string): Observable<Users>{
    let data : string = "login=" + login + "&password=" + password + "&prenom=" + prenom + "&nom=" + nom;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.Http.post<Users>(this.urlApiSignin, data, httpOptions);
  }
}
