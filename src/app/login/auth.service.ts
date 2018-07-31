import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response, HttpModule} from '@angular/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {

  constructor(public http: Http) { }
  private loginUrl = environment.baseUrl
  
  public getToken(): string {
    return localStorage.getItem('currentUser');
  }
  
  isLoggedIn() {
    return this.getToken() !== null;
  }
  
  getCurrentUser():User{
    return JSON.parse(localStorage.getItem('currentUser')); 
  }
  
  getRole(): string{
    return this.getCurrentUser().role;
  }

  public logIn(user: User){

    const headers = new Headers();
    headers.append('Accept', 'application/json')
    // creating base64 encoded String from user name and password
    localStorage.setItem('infoUser', JSON.stringify(user));
    const base64Credential: string = btoa( user.username+ ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);
     
    const options = new RequestOptions();
    options.headers=headers;

    return this.http.get(this.loginUrl + "/account/login", options)
      .map((response: Response) => {
      // login successful if there's a jwt token in the response
      const user = response.json().principal;// the returned user object is a principal object
      
      if (user) {
        console.log(user);
        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });
  }


  public logOut() {
    // remove user from local storage to log user out
    console.log(this.isLoggedIn());
      localStorage.removeItem('currentUser');
      localStorage.removeItem('infoUser');
       console.log(this.isLoggedIn());  
        console.log('removed');
      
  }
}
