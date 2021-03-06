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
import { AddMarkComponent } from './mark/add-mark.component';
import { EditMarkComponent } from './mark/edit.mark.component';
import { MarkComponent } from './mark/mark.component';
import {AddStudComponent} from './stud/add-stud.component';
import { EditStudComponent } from './stud/edit-stud.component';
import { AddSubjectComponent } from './subject/add-subject.component';
import { EditSubjectComponent } from './subject/edit-subject.component';
import { SubjectComponent } from './subject/subject.component';
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
     { path: 'add-stud', component: AddStudComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'edit-stud/:id', component: EditStudComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'groups', component: GrComponent, outlet: 'cont' },
     { path: 'add-group', component: AddGroupComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'edit-group/:id', component: EditGroupComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'teachers', component: TeacherComponent, outlet: 'cont'},
     { path: 'add-teacher', component: AddTeacherComponent, outlet: 'cont', data: {roles:'ADMIN'}},
     { path: 'edit-teacher/:id', component: EditTeacherComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'subjects', component: SubjectComponent, outlet: 'cont'},
     { path: 'add-subject', component: AddSubjectComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'edit-subject/:id', component: EditSubjectComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'marks', component: MarkComponent, outlet: 'cont'},
     { path: 'add-mark', component: AddMarkComponent, outlet: 'cont', data: {roles:'ADMIN'} },
     { path: 'edit-mark/:id', component: EditMarkComponent, outlet: 'cont', data: {roles:'ADMIN'} },
   ] },
  { path: '**', redirectTo: '/app-login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ConfirmationModalModule.forRoot({
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