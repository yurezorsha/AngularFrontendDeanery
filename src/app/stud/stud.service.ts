import { environment } from '../../environments/environment';
import { Gr } from '../model/gr.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Stud } from '../model/stud.model';
import { Observable } from 'rxjs';
import { GrService } from '../group/group.service';
import { AuthService } from '../login/auth.service';
import { User } from '../model/model.user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudService {
  gr: Gr;
  currentUser: User;

  constructor(public authService: AuthService, private http:HttpClient) {
   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  
  
  private studUrl = environment.baseUrl+'/deanery/stud';
  
  
  public getStud(id: number) {
    return this.http.get<Stud>(this.studUrl + "/"+id, );
  }
  
  public getStuds():Observable<Stud[]> {
    return this.http.get<Stud[]>(this.studUrl);
  }
  
  

  public deleteStud(stud: Stud) {
    return this.http.delete(this.studUrl + "/"+ stud.idStud);
  }
  
  public updateStud(stud: Stud) {
   
    return this.http.put<Stud>(this.studUrl, stud);
  }

  public createStud(stud: Stud) {
   
    return this.http.post<Stud>(this.studUrl, stud);
  }

}
