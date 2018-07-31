import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gr } from '../model/gr.model';
import { Stud } from '../model/stud.model';
import { StudService } from './stud.service';
import { GrService } from '../group/group.service';

@Component({
  styleUrls: ['../app.component.css'],
  templateUrl: './add-stud.component.html'
})
export class AddStudComponent implements OnInit {


  stud: Stud = new Stud();
  grs: Gr[];



  constructor(private router: Router,public route: ActivatedRoute, private studService: StudService, private grService: GrService ) {

  }

  ngOnInit(): void {
    this.grService.getGrs()
      .subscribe( data => {
        this.grs = data;
      });
  }

  createStud(): void {
      this.studService.createStud(this.stud)
        .subscribe( data => {
          alert('Stud created successfully.');
          this.router.navigate(['../studs'],{relativeTo: this.route});
        });

  }

}
