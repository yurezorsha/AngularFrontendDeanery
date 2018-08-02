import { Gr } from '../model/gr.model';
import { GrService } from './group.service';
import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  
  templateUrl: './edit-group.component.html'
})

export class EditGroupComponent implements OnInit {



 public group: Gr = new Gr();
 sub: Subscription;
 idGroup:number;
 name:string;
  


  
  
  constructor(private route: ActivatedRoute, private router: Router, private grService: GrService ) {
 
  }
  
  ngOnInit(): void {
            
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.grService.getGr(id).subscribe((group: any) => {
          if (group) {
            this.group=group;
            this.idGroup=this.group.idGroup;
            this.name=this.group.name;
           
            } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
       
      
  }
  
 
  
  cancel(){
     this.group.idGroup=this.idGroup;
     this.group.name=this.name;
    
     }
 
  
  gotoList() {
    this.router.navigateByUrl('/content/(cont:groups)');
  }
 
  editGroup(): void {
      this.grService.updateGr(this.group)
        .subscribe( data => {
          alert("Edit successfully.");
            this.router.navigateByUrl('/content/(cont:groups)');
        });
   
       // this.router.navigate(['../studs'],{relativeTo: this.route});
  };

}