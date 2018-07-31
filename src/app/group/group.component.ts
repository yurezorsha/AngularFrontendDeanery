import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Gr } from '../model/gr.model';
import { GrService } from './group.service';

@Component({

  templateUrl: './group.component.html',
  styles: []
})
export class GrComponent implements OnInit {

 grs: Gr[];

  constructor(private router: Router, private grService: GrService) {

  }

  ngOnInit(): void {
    this.grService.getGrs()
      .subscribe( data => {
        this.grs = data;
      });
  }

  deleteGr(gr: Gr): void {
    this.grService.deleteGr(gr)
      .subscribe( data => {
        this.grs = this.grs.filter(u => u !== gr);
      })
  };
  }