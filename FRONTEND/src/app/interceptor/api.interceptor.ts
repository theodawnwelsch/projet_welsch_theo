import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  jwtToken: String = "";

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.jwtToken !== "") {
      request = request.clone({setHeaders: {Authorization: 'Bearer ${this.jwtToken}'}});
    }
    
    return next.handle(request).pipe(tap(
      (evt: HttpEvent<any>) => {
        if(evt instanceof HttpResponse) {
          let array : Array<String>;
          let headerAuthorization = evt.headers.get("Authorization");
          if (headerAuthorization != null) {
            array = headerAuthorization.split(/Bearer\s+(.*)$/i);
            if(array.length > 1) this.jwtToken = array[1];
          }
        }
      }
    ));
  }
}
