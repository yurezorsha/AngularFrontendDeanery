import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../model/model.user";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User=new User();
  errorMessage:string;
  constructor(private authService: AuthService, private router: Router) { }



  ngOnInit() {
  }

  login(){
    this.authService.logIn(this.user)
      .subscribe(data=>{
        console.log(this.user);
        console.log(this.authService.getRole());
        this.router.navigate(['/content']);
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
        }
      )
  }
}
