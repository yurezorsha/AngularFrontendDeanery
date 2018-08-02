import { Gr } from '../model/gr.model';
import { GrService } from './group.service';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  //styleUrls: ['../app.component.css'],
  templateUrl: './add-group.component.html'
})
export class AddGroupComponent implements OnInit {

  group: Gr = new Gr();
  
  constructor(private router: Router,public route: ActivatedRoute,  private grService: GrService ) {

  }

  ngOnInit(): void {
    
  }

  createGroup(): void {
      this.grService.createGr(this.group)
        .subscribe( data => {
          alert('Group created successfully.');
          this.router.navigate(['../groups'],{relativeTo: this.route});
        });

  }

}