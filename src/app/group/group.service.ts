import { environment } from '../../environments/environment';
import { Gr } from '../model/gr.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';





const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GrService {
  gr: Gr;

  constructor(private http:HttpClient) {}

  
    private grUrl = environment.baseUrl+'/user/gr'

  public getGrs() {
    return this.http.get<Gr[]>(this.grUrl);
  }
  
  

  public deleteGr(group: Gr) {
    return this.http.delete(this.grUrl + "/"+ group.idGroup);
  }

  public createGr(group: Gr) {
   
    return this.http.post<Gr>(this.grUrl, group);
  }
  
  public updateGr(group: Gr) {
   
    return this.http.put<Gr>(this.grUrl, group);
  }

}
