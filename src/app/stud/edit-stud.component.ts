import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gr } from '../model/gr.model';
import { Stud } from '../model/stud.model';
import { StudService } from './stud.service';
import { GrService } from '../group/group.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  styleUrls: ['../app.component.css'],
  templateUrl: './edit-stud.component.html'
})

export class EditStudComponent implements OnInit {



 public stud: Stud = new Stud();
 public  grs: Gr[];
 sub: Subscription;
 idstud:number;
 firstname:string;
 surname:string;
 patronymic:string;
 course:number;
 group:Gr;
  


  
  
  constructor(private route: ActivatedRoute, private router: Router, private studService: StudService, private grService: GrService ) {
 
  }
  
  ngOnInit(): void {
            
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.studService.getStud(id).subscribe((stud: any) => {
          if (stud) {
            this.stud=stud;
            this.idstud=this.stud.idStud;
            this.firstname=this.stud.firstName;
            this.surname=this.stud.surName;
            this.patronymic=this.stud.patronymic;
            this.course=this.stud.course;
            this.group=this.stud.gr;
           
            
          } else {
            console.log(`Student with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    
    this.grService.getGrs()
      .subscribe( data => {
        this.grs = data;
      });
     
    
      
  }
  
  compareFn(x: Gr, y:Gr): boolean{
    return x && y ? x.name === y.name: x === y;
  }
  
  cancel(){
       this.stud.idStud = this.idstud;
       this.stud.firstName = this.firstname;
       this.stud.surName =  this.surname;
       this.stud.patronymic  = this.patronymic;
       this.stud.course  = this.course;
       this.stud.gr  = this.group;
    
     }
 
  
  gotoList() {
       this.router.navigateByUrl('/content/(cont:studs)');
  }
 
  editStud(): void {
      this.studService.updateStud(this.stud)
        .subscribe( data => {
          alert("Edit successfully.");
            this.router.navigateByUrl('/content/(cont:studs)');
        });
   
       // this.router.navigate(['../studs'],{relativeTo: this.route});
  };

}

