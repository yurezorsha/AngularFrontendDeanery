import { environment } from '../../environments/environment';
import { Teacher } from '../model/teacher.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeacherService {
  


  constructor(private http:HttpClient) {
   
  }
  
  
  private teacherUrl = environment.baseUrl+'/deanery/teacher';
  
  
  public getTeacher(id: number) {
    return this.http.get<Teacher>(this.teacherUrl + "/"+id, );
  }
  
  public getTeachers():Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl);
  }
  
  

  public deleteTeacher(teacher: Teacher) {
    return this.http.delete(this.teacherUrl + "/"+ teacher.idTeach);
  }
  
  public updateTeacher(teacher: Teacher) {
   
    return this.http.put<Teacher>(this.teacherUrl, teacher);
  }

  public createTeacher(teacher: Teacher) {
   
    return this.http.post<Teacher>(this.teacherUrl, teacher);
  }

}