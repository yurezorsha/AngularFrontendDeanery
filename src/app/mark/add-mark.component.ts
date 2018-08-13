import { Mark } from '../model/mark.model';
import { Stud } from '../model/stud.model';
import { Subject } from '../model/subject.model';
import { StudService } from '../stud/stud.service';
import { SubjectService } from '../subject/subject.service';
import { MarkService } from './mark.service';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

  @Component({
   templateUrl: './add-mark.component.html'
})
export class AddMarkComponent implements OnInit {


  curmark: Mark = new Mark();
  subjects: Subject[];
  students: Stud[];
  marks=[1,2,3,4,5,6,7,8,9,10];
  


  constructor(private router: Router, public route: ActivatedRoute, private markService: MarkService, private studService: StudService, private subjectService: SubjectService ) {
  
  }

  ngOnInit(): void {
    
    this.studService.getStuds()
      .subscribe( data => {
        this.students = data;
      });
    
    this.subjectService.getSubjects()
      .subscribe( data => {
        this.subjects = data;
      });
    
    
  }

  createMark(): void {
      this.markService.createMark(this.curmark)
        .subscribe( data => {
          alert('Mark created successfully.');
          this.router.navigate(['../marks'],{relativeTo: this.route});
        });

  }

}