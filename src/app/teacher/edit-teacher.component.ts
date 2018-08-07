import { Teacher } from '../model/teacher.model';
import { TeacherService } from './teacher.service';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  
  templateUrl: './edit-teacher.component.html'
})
export class EditTeacherComponent implements OnInit {



 public teacher: Teacher = new Teacher();
 sub: Subscription;
 idteach:number;
 firstname:string;
 surname:string;
 patronymic:string;
  
  
  constructor(private route: ActivatedRoute, private router: Router, private teacherService: TeacherService) {
 
  }
  
  ngOnInit(): void {
            
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.teacherService.getTeacher(id).subscribe((teacher: any) => {
          if (teacher) {
            this.teacher=teacher;
            this.idteach=this.teacher.idTeach;
            this.firstname=this.teacher.firstName;
            this.surname=this.teacher.surName;
            this.patronymic=this.teacher.patronymic;
                  
                        
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    
  
      
  }
  
  
  
  cancel(){
       this.teacher.idTeach = this.idteach;
       this.teacher.firstName = this.firstname;
       this.teacher.surName =  this.surname;
       this.teacher.patronymic  = this.patronymic;
         
     }
 
  
  gotoList() {
     this.router.navigateByUrl('/content/(cont:teachers)');
  }
 
  editTeacher(): void {
      this.teacherService.updateTeacher(this.teacher)
        .subscribe( data => {
          alert("Edit successfully.");
            this.router.navigateByUrl('/content/(cont:teachers)');
        });
   
       // this.router.navigate(['../studs'],{relativeTo: this.route});
  };

}