
import { Subject } from '../model/subject.model';
import { Teacher } from '../model/teacher.model';
import { TeacherService } from '../teacher/teacher.service';
import { SubjectService } from './subject.service';
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  
  templateUrl: './edit-subject.component.html'
})
export class EditSubjectComponent implements OnInit {

 public subject: Subject = new Subject();
 public  teachers: Teacher[];
 sub: Subscription;
 idsubj:number;
 name:string;
 curteacher:Teacher;
 
  
  constructor(private route: ActivatedRoute, private router: Router, private subjectService: SubjectService, private teacherService: TeacherService ) {
 
  }
  
  ngOnInit(): void {
            
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.subjectService.getSubject(id).subscribe((subject: any) => {
          if (subject) {
            this.subject=subject;
            this.idsubj=this.subject.idSubj;
            this.name=this.subject.name;
            this.curteacher=this.subject.teacher;
            
         
            
          } else {
            console.log(`Subject with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    
    this.teacherService.getTeachers()
      .subscribe( data => {
        this.teachers = data;
      });
     
    
      
  }
  
  compareFn(x: Teacher, y:Teacher): boolean{
    return x && y ? x.idTeach === y.idTeach: x === y;
  }
  
  cancel(){
       this.subject.idSubj = this.idsubj;
       this.subject.name = this.name;
       this.subject.teacher =  this.curteacher;
       
    
     }
 
  
  gotoList() {
       this.router.navigateByUrl('/content/(cont:subjects)');
  }
 
  editSubject(): void {
      this.subjectService.updateSubject(this.subject)
        .subscribe( data => {
          alert("Edit successfully.");
            this.router.navigateByUrl('/content/(cont:subjects)');
        });
   
   
  };

}