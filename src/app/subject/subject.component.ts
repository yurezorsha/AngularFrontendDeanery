import { AuthService } from '../login/auth.service';
import { Subject } from '../model/subject.model';
import { SubjectService } from './subject.service';
import { OnInit, ViewChild, Component } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';


@Component({
 
  templateUrl: './subject.component.html',
  
})
export class SubjectComponent implements OnInit {
  
  options: any = {
  confirmBtnClass: 'btn btn-success',      //DEFAULT VALUE
  confirmBtnText: 'Confirm',              //DEFAULT VALUE
  cancelBtnClass: 'btn btn-danger',      //DEFAULT VALUE
  cancelBtnText: 'Cancel',              //DEFAULT VALUE
  modalSize: 'lg',                     //DEFAULT VALUE
  modalClass: ''                      //DEFAULT VALUE
 }
  
 
  subjects: Subject[]=[];
  role: string;
  
  displayedColumns = ['id', 'name', 'teacher', 'edit', 'delete'];
  dataSource: MatTableDataSource<Subject>;
  
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
  
  constructor(public authService: AuthService, private router: Router, private subjectService: SubjectService) {
    this.role = authService.getRole();
     
  }

  ngOnInit() {
    this.initDataSource();
  
  };
  
  initDataSource(){
    this.subjectService.getSubjects()
      .subscribe( (data: any) => {
        this.subjects = data;
        this.dataSource = new MatTableDataSource(this.subjects);
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
            return key === 'teacher' ? currentTerm + data.teacher.fio : currentTerm + data[key];
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

  deleteSubject(subject: Subject): void {
      //if(window.confirm("Are you want to delete this item?")){
    this.subjectService.deleteSubject(subject)
      .subscribe( data => {
       
        this.subjects = this.subjects.filter(u => u !== subject);
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