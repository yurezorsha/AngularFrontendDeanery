import { ContentComponent } from './content/content.component';
import { AddGroupComponent } from './group/add-group.component';
import { EditGroupComponent } from './group/edit-group.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudComponent } from './stud/stud.component';
import { GrComponent } from './group/group.component';
import { AccessGuard } from './guards/access_guard';
import { AuthGuard } from './guards/auth_guard';
import { TokenInterceptor } from './login/TokenInterceptor';
import { LoginComponent } from './login/login.component';
import {AddStudComponent} from './stud/add-stud.component';
import { EditStudComponent } from './stud/edit-stud.component';
import { AddTeacherComponent } from './teacher/add-teacher.component';
import { EditTeacherComponent } from './teacher/edit-teacher.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ConfirmationModalModule } from 'ng-confirmation-modal';




const routes: Routes = [

  //{ path: 'studs', component: StudComponent },
  //{ path: 'addstud', component: AddStudComponent },
  //{ path: 'groups', component: GrComponent },
  //{ path: 'edit-stud/:id', component: EditStudComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'content', component: ContentComponent,canActivate: [AuthGuard],canActivateChild: [AuthGuard], 
  children: [
     { path: 'studs', component: StudComponent, outlet: 'cont'},
     { path: 'addstud', component: AddStudComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'edit-stud/:id', component: EditStudComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'groups', component: GrComponent, outlet: 'cont' },
     { path: 'addgroup', component: AddGroupComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'edit-group/:id', component: EditGroupComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'teachers', component: TeacherComponent, outlet: 'cont'},
     { path: 'add-teacher', component: AddTeacherComponent, outlet: 'cont', data: {roles:'ADMIN'}},
     { path: 'edit-teacher/:id', component: EditTeacherComponent, outlet: 'cont', data: {roles:'ADMIN'} }
   ] },
  { path: '**', redirectTo: '/app-login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ConfirmationModalModule.forRoot({
   //optional global config
 
   //confirmBtnClass: 'btn btn-success',
   //confirmBtnText: 'Confirm',
   //cancelBtnClass: 'btn btn-danger',
   //cancelBtnText: 'Cancel',
   //modalSize: 'lg',
   //modalClass: 'some-modal-class'
  })
  ],
  exports: [
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    
    
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }