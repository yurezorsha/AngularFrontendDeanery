import { AuthService } from '../login/auth.service';
import {forwardRef, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  
  role: string;
  constructor(private auth: AuthService,
    private route: Router){
 
  }
  
  canActivate() {
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      window.alert("You didn't authorize!");
      this.route.navigate(['/app-login']);
      return false;
    }
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const roles=childRoute.data['roles'];
    this.role=this.auth.getRole();
    console.log(roles);
     console.log(this.role);
    if (!roles || this.role===roles){
       return true;
    }else{
      window.alert("You have not rights!");
      this.route.navigate(['/content']);
      return false;
    }
      
   
      }
}
