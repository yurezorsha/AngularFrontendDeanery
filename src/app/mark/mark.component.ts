import { AuthService } from '../login/auth.service';
import { Mark } from '../model/mark.model';
import { MarkService } from './mark.service';
import { OnInit, ViewChild, Component } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
 
  templateUrl: './mark.component.html',
  
})
export class MarkComponent implements OnInit {
  
  options: any = {
  confirmBtnClass: 'btn btn-success',      //DEFAULT VALUE
  confirmBtnText: 'Confirm',              //DEFAULT VALUE
  cancelBtnClass: 'btn btn-danger',      //DEFAULT VALUE
  cancelBtnText: 'Cancel',              //DEFAULT VALUE
  modalSize: 'lg',                     //DEFAULT VALUE
  modalClass: ''                      //DEFAULT VALUE
 }
   
  marks: Mark[]=[];
  role: string;
  
  displayedColumns = ['id', 'mark', 'date','student', 'subject','group', 'edit', 'delete'];
  dataSource: MatTableDataSource<Mark>;
  
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
  
  constructor(public authService: AuthService, private router: Router, private markService: MarkService) {
    this.role = authService.getRole();
     
  }

  ngOnInit() {
    this.initDataSource();
  
  };
  
  initDataSource(){
    this.markService.getMarks()
      .subscribe( (data: any) => {
        this.marks = data;
        this.dataSource = new MatTableDataSource(this.marks);
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
            return key === 'student' ? currentTerm + data.student.fio +data.student.gr.name : key==='subject' ? currentTerm + data.subject.name : currentTerm + data[key];
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

  deleteMark(mark: Mark): void {
    //if(window.confirm("Are you want to delete this item?")){
    this.markService.deleteMark(mark)
      .subscribe( data => {
       
        this.marks = this.marks.filter(u => u !== mark);
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

