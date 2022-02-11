import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentTask, ITask} from "../models/Task";

const TASK_API = 'http://localhost:8090/api/task/';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  task: ITask;
  currentTaskId: number;
  isLoadData: boolean;

  constructor(private http: HttpClient) {
    this.isLoadData = false;
  }

  public createTask(task: {
    title: any;
    reference: any;
    employeeId: any;
    priorityId: any;
    categoryId: any;
    dateControl: any;
    note: any;
  }): Observable<any> {
    return this.http.post(TASK_API + "add", {
      title: task.title,
      reference: task.reference,
      employeeId: task.employeeId,
      priorityId: task.priorityId,
      categoryId: task.categoryId,
      dateControl: task.dateControl,
      note: task.note
    });
  }

  public updateTask(task: {
    id: any;
    title: any;
    reference: any;
    employeeId: any;
    priorityId: any;
    categoryId: any;
    dateControl: any;
    note: any;
  }): Observable<any> {
    return this.http.post(TASK_API + "update", {
      id: task.id,
      title: task.title,
      reference: task.reference,
      employeeId: task.employeeId,
      priorityId: task.priorityId,
      categoryId: task.categoryId,
      dateControl: task.dateControl,
      note: task.note
    });
  }

  listTask(): Observable<any> {
    return this.http.get(TASK_API + 'all');
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(TASK_API + 'id/' + id);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.get(TASK_API + 'delete/' + id);
  }

  setCurrentTaskId(id: number): void {
    this.currentTaskId = id;
  }

  setTask(task: ITask): void {
    this.task = task;
    this.isLoadData = true;
  }

  getTask(): ITask {
    return this.task;
  }
}
