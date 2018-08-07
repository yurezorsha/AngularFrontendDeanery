import { environment } from '../../environments/environment';
import { Subject } from '../model/subject.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class SubjectService {
  


  constructor(private http:HttpClient) {
   
  }
  
  
  private subjectUrl = environment.baseUrl+'/deanery/subject';
  
  
  public getSubject(id: number) {
    return this.http.get<Subject>(this.subjectUrl + "/"+id, );
  }
  
  public getSubjects():Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectUrl);
  }
  
  

  public deleteSubject(subject: Subject) {
    return this.http.delete(this.subjectUrl + "/"+ subject.idSubj);
  }
  
  public updateSubject(subject: Subject) {
   
    return this.http.put<Subject>(this.subjectUrl, subject);
  }

  public createSubject(subject: Subject) {
   
    return this.http.post<Subject>(this.subjectUrl, subject);
  }

}