

import { AuthService } from '../login/auth.service';
import {forwardRef, Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AccessGuard implements CanActivateChild {
  
  role: string;
  
  constructor(private auth: AuthService,
    private route: Router) {
    this.role = this.auth.getRole();
  }
  
  
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const roles=childRoute.data['roles'];
    
    if (!roles || this.role===roles){
       return true;
    }else{
      window.alert("You have not rights!");
      this.route.navigate(['/app-login']);
      return false;
    }
      
   
      }
  }

  
  
 
