import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const TASK_API = 'http://localhost:8090/api/task/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  public createTask(task:{
    title: any;
    employeeId: any;
    priorityId: any;
    categoryId: any;
    dateControl: any;
  }): Observable<any> {
    return this.http.post(TASK_API + "add", {
      title:task.title,
      employeeId:task.employeeId,
      priorityId:task.priorityId,
      categoryId:task.categoryId,
      dateControl:task.dateControl
    });
  }

  public createTaskOld(task: any): Observable<any>{
    return this.http.post(TASK_API+"add",task);
  }
  listTask(): Observable<any> {
    return this.http.get(TASK_API + 'all');
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(TASK_API + 'id/' + id);
  }

  updateTask(task: any): Observable<any> {
    return this.http.post(TASK_API + 'update', task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.get(TASK_API + 'delete/' + id);
  }

}
