import { Teacher } from '../model/teacher.model';
import { TeacherService } from './teacher.service';
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({

  templateUrl: './add-teacher.component.html'
})
export class AddTeacherComponent implements OnInit {


  teacher: Teacher = new Teacher();
 
  constructor(private router: Router,public route: ActivatedRoute, private teacherService: TeacherService) {

  }

  ngOnInit(): void {
    
  }

  createTeacher(): void {
      this.teacherService.createTeacher(this.teacher)
        .subscribe( data => {
          alert('Teacher created successfully.');
          this.router.navigate(['../teachers'],{relativeTo: this.route});
        });

  }

}
