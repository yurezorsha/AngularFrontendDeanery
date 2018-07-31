import { AuthService } from '../login/auth.service';
import { User } from '../model/model.user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Stud } from '../model/stud.model';
import { StudService } from './stud.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
 
  templateUrl: './stud.component.html',
  
})
export class StudComponent implements OnInit {
  
  options: any = {
  confirmBtnClass: 'btn btn-success',      //DEFAULT VALUE
  confirmBtnText: 'Confirm',              //DEFAULT VALUE
  cancelBtnClass: 'btn btn-danger',      //DEFAULT VALUE
  cancelBtnText: 'Cancel',              //DEFAULT VALUE
  modalSize: 'lg',                     //DEFAULT VALUE
  modalClass: ''                      //DEFAULT VALUE
 }
  
  currentUser: User;
 
  studs: Stud[]=[];
  role: string;
  
  displayedColumns = ['idStud', 'firstName', 'surName','patronymic', 'course', 'gr', 'edit', 'delete'];
  dataSource: MatTableDataSource<Stud>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  isAccess():boolean{
    if(this.role==="USER"){
      return true;
    }
    else{
      return false;
    }
    
  }
  
  constructor(public authService: AuthService, private router: Router, private studService: StudService) {
    this.role = authService.getRole();
     
  }

  ngOnInit() {
    this.initDataSource();
  
  };
  
  initDataSource(){
    this.studService.getStuds()
      .subscribe( (data: any) => {
        this.studs = data;
        this.dataSource = new MatTableDataSource(this.studs);
        this.initDataSourceSettings();
      });
    
  }
  
  initDataSourceSettings(){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        this.setFilterPredicate();
    
  }
  
  setFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return key === 'gr' ? currentTerm + data.gr.name : currentTerm + data[key];
          };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
  }
  
  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStud(stud: Stud): void {
    //if(window.confirm("Are you want to delete this item?")){
    this.studService.deleteStud(stud)
      .subscribe( data => {
       
        this.studs = this.studs.filter(u => u !== stud);
        this.initDataSource();
      })
  //};
  }
  
  confirmed() {
    
  
  console.log('confirme open');
    
 }
 
 cancelled() {
  console.log('cancelled');
 }

}

