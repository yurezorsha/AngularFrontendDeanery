import { AuthService } from '../login/auth.service';
import { User } from '../model/model.user';
import { StudService } from '../stud/stud.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'content',
  templateUrl: './content.html',
  styleUrls: ['./Menu.css'],
})
  
export class ContentComponent {
  title = 'content';
  currentUser: User;
  
  
  constructor(public authService: AuthService, private router: Router, private studService: StudService) {
  this.currentUser = this.authService.getCurrentUser();
   
  }
  
  logOut() {
  
    this.authService.logOut();
    console.log(localStorage.getItem('currentUser'));
   
    this.router.navigate(['/app-login']); 
  }
  
  
  
}
