import { environment } from '../../environments/environment';
import { Mark } from '../model/mark.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class MarkService {
  


  constructor(private http:HttpClient) {
   
  }
  
  
  private markUrl = environment.baseUrl+'/deanery/mark';
  
  
  public getMark(id: number) {
      return this.http.get<Mark>(this.markUrl + "/"+id, );
  }
  
  public getMarks():Observable<Mark[]> {
    return this.http.get<Mark[]>(this.markUrl);
  }
  
  

  public deleteMark(mark: Mark) {
    return this.http.delete(this.markUrl + "/"+ mark.idMark);
  }
  
  public updateMark(mark: Mark) {
   
    return this.http.put<Mark>(this.markUrl, mark);
  }

  public createMark(mark: Mark) {
   
    return this.http.post<Mark>(this.markUrl, mark);
  }

}
