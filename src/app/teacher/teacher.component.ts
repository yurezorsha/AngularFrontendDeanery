import { AuthService } from '../login/auth.service';
import { Teacher } from '../model/teacher.model';
import { StudService } from '../stud/stud.service';
import { TeacherService } from './teacher.service';
import { OnInit, ViewChild, Component } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
 
  templateUrl: './teacher.component.html',
  
})
  
  
export class TeacherComponent implements OnInit {
  
  options: any = {
  confirmBtnClass: 'btn btn-success',      //DEFAULT VALUE
  confirmBtnText: 'Confirm',              //DEFAULT VALUE
  cancelBtnClass: 'btn btn-danger',      //DEFAULT VALUE
  cancelBtnText: 'Cancel',              //DEFAULT VALUE
  modalSize: 'lg',                     //DEFAULT VALUE
  modalClass: ''                      //DEFAULT VALUE
 }
  

 
  teachers: Teacher[]=[];
  role: string;
  
  displayedColumns = ['id', 'firstName', 'surName','patronymic', 'edit', 'delete'];
  dataSource: MatTableDataSource<Teacher>;
  
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
  
  constructor(public authService: AuthService, private router: Router, private teacherService: TeacherService) {
    this.role = authService.getRole();
     
  }

  ngOnInit() {
    this.initDataSource();
  
  };
  
  initDataSource(){
    this.teacherService.getTeachers()
      .subscribe( (data: any) => {
        this.teachers = data;
        this.dataSource = new MatTableDataSource(this.teachers);
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

  deleteStud(teacher: Teacher): void {
    //if(window.confirm("Are you want to delete this item?")){
    this.teacherService.deleteTeacher(teacher)
      .subscribe( data => {
       
        this.teachers = this.teachers.filter(u => u !== teacher);
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
