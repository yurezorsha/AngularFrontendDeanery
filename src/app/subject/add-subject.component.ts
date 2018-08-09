import { Subject } from '../model/subject.model';
import { Teacher } from '../model/teacher.model';
import { TeacherService } from '../teacher/teacher.service';
import { SubjectService } from './subject.service';
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({

  templateUrl: './add-subject.component.html'
})
export class AddSubjectComponent implements OnInit {


  subject: Subject = new Subject();
  teachers: Teacher[];



  constructor(private router: Router,public route: ActivatedRoute, private subjectService: SubjectService, private teacherService: TeacherService ) {

  }

  ngOnInit(): void {
    this.teacherService.getTeachers()
      .subscribe( data => {
        this.teachers = data;
      });
  }

  createSubject(): void {
      this.subjectService.createSubject(this.subject)
        .subscribe( data => {
          alert('Subject created successfully.');
          this.router.navigate(['../subjects'],{relativeTo: this.route});
        });

  }

}