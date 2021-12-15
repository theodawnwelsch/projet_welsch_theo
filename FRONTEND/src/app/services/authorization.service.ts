import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  urlApiLogin: string = "/api/login";
  urlApiAuth: string = "/api/client/";

  constructor(private Http: HttpClient) { }

  
  public postLogin(login: string, password: string): Observable<Users>{
    let data: string = "login=" + login + "&password=" + password;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };

    return this.Http.post<Users>(this.urlApiLogin, data, httpOptions);
  }

  public getLogin(login:string): Observable<Users>{
    let data : string = "login=" + login;
    return this.Http.get<Users>(this.urlApiAuth + login);
  }
}
