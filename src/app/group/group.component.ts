import { AuthService } from '../login/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Gr } from '../model/gr.model';
import { GrService } from './group.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({

  templateUrl: './group.component.html',
  styles: []
})
export class GrComponent implements OnInit {
   
 options: any = {
  confirmBtnClass: 'btn btn-success',      //DEFAULT VALUE
  confirmBtnText: 'Confirm',              //DEFAULT VALUE
  cancelBtnClass: 'btn btn-danger',      //DEFAULT VALUE
  cancelBtnText: 'Cancel',              //DEFAULT VALUE
  modalSize: 'lg',                     //DEFAULT VALUE
  modalClass: ''                      //DEFAULT VALUE
 }
  
  
 
  grs: Gr[];
  role: string;
  displayedColumns = ['ID', 'Name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Gr>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
  constructor(private router: Router, private grService: GrService, public authService: AuthService) {
     this.role = authService.getRole();
  }

  ngOnInit(): void {
    this.initDataSource();
  }
  
  isAccess():boolean{
    if(this.role==="USER"){
      return true;
    }
    else{
      return false;
    }
    
  }

  deleteGr(gr: Gr): void {
    this.grService.deleteGr(gr)
      .subscribe( data => {
        this.grs = this.grs.filter(u => u !== gr);
        this.initDataSource();
      })
  };
  
   initDataSource(){
    this.grService.getGrs()
      .subscribe( (data: any) => {
        this.grs = data;
        this.dataSource = new MatTableDataSource(this.grs);
        this.initDataSourceSettings();
      });
    
  }
  
  
  initDataSourceSettings(){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      
      }
  
  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  confirmed() {
    
  
  console.log('confirme open');
    
 }
 
 cancelled() {
  console.log('cancelled');
 }

  
  }