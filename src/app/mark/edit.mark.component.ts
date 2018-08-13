import { Mark } from '../model/mark.model';
import { Stud } from '../model/stud.model';
import { Subject } from '../model/subject.model';
import { StudService } from '../stud/stud.service';
import { SubjectService } from '../subject/subject.service';
import { MarkService } from './mark.service';
import { OnInit, Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
   templateUrl: './edit-mark.component.html'
})
export class EditMarkComponent implements OnInit {

 public curmark: Mark = new Mark();
 public  students: Stud[];
 public  subjects: Subject[];
 sub: Subscription;
 idmark:number;
 mark:number;
 date:Date;
 student:Stud;
 subject:Subject;
 marks=[1,2,3,4,5,6,7,8,9,10]; 
  
  constructor(private route: ActivatedRoute, private router: Router, private markService: MarkService, private studService: StudService, private subjectService: SubjectService ) {
 
  }
  
  ngOnInit(): void {
            
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.markService.getMark(id).subscribe((mark: any) => {
          if (mark) {
            this.curmark=mark;
            this.idmark=this.curmark.idMark;
            this.date=this.curmark.date;
            this.mark=this.curmark.mark;
            this.student=this.curmark.student;
            this.subject=this.curmark.subject;
            
          } else {
            console.log(`Mark with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    
    this.studService.getStuds()
      .subscribe( data => {
        this.students = data;
      });
    
    this.subjectService.getSubjects()
      .subscribe( data => {
        this.subjects= data;
      });
     
    
      
  }
  
  compareFnStud(x: Stud, y:Stud): boolean{
    return x && y ? x.idStud === y.idStud: x === y;
  }
  
  compareFnSubj(x: Subject, y:Subject): boolean{
    return x && y ? x.idSubj === y.idSubj: x === y;
  }
  
  cancel(){
       this.curmark.idMark=this.idmark;
       this.curmark.date=this.date;
       this.curmark.mark=this.mark;
       this.curmark.student=this.student;
       this.curmark.subject=this.subject;
     }
 
  
  gotoList() {
       this.router.navigateByUrl('/content/(cont:marks)');
  }
 
  editMark(): void {
      this.markService.updateMark(this.curmark)
        .subscribe( data => {
          alert("Edit successfully.");
            this.router.navigateByUrl('/content/(cont:marks)');
        });
   
       };

}

