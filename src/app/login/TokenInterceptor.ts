import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { User } from '../model/model.user';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentUser: User;
  constructor(public auth: AuthService) {
  this.currentUser = JSON.parse(localStorage.getItem('infoUser'));
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
     const base64Credential: string = btoa( this.currentUser.username +':'+ this.currentUser.password);
     //console.log(base64Credential + "  "+this.currentUser.password);
    request = request.clone({
      
      setHeaders: {
        'Accept': 'application/json',
        Authorization: "Basic "+ base64Credential
      }
    });
    return next.handle(request);
  }
}