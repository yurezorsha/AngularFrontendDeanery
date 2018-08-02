import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudComponent } from './stud/stud.component';
import { GrService } from './group/group.service';
import { AppRoutingModule } from './app.routing.module';
import { ContentComponent } from './content/content.component';
import { AddGroupComponent } from './group/add-group.component';
import { EditGroupComponent } from './group/edit-group.component';
import { GrComponent } from './group/group.component';
import { AccessGuard } from './guards/access_guard';
import { AuthGuard } from './guards/auth_guard';
import { AuthService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import {StudService} from './stud/stud.service';
import {HttpClientModule} from "@angular/common/http";
import {AddStudComponent} from './stud/add-stud.component';
import { EditStudComponent } from './stud/edit-stud.component';
import { HttpModule } from '@angular/http';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModalModule } from 'ng-confirmation-modal';


@NgModule({
  declarations: [
    AppComponent,
    StudComponent,
    AddStudComponent,
    EditStudComponent,
    GrComponent,
    AddGroupComponent,
    EditGroupComponent,
    ContentComponent,
    LoginComponent,
    
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ConfirmationModalModule.forRoot({
   
  })
 
   
  ],
  providers: [StudService, GrService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
  
})
export class AppModule { }
