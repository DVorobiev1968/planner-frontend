import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentTask, ITask} from "../models/Task";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  task: ITask;
  currentTaskId: number;
  isLoadData: boolean;
  conf:Conf;
  constructor(private http: HttpClient) {
    this.isLoadData = false;
    this.conf=new Conf();
  }

  public createTaskExtend(task: {
    title: any;
    reference: any;
    employeeId: any;
    priorityId: any;
    categoryId: any;
    dateControl: any;
    note: any;
    teamliedId:any;
  }): Observable<any> {
    return this.http.post(this.conf.TASK_API + "add_extend", {
      title: task.title,
      reference: task.reference,
      employeeId: task.employeeId,
      priorityId: task.priorityId,
      categoryId: task.categoryId,
      dateControl: task.dateControl,
      note: task.note,
      id:task.teamliedId
    });
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
    return this.http.post(this.conf.TASK_API + "add", {
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
    completed: any;
  }): Observable<any> {
    return this.http.post(this.conf.TASK_API + "update", {
      id: task.id,
      title: task.title,
      reference: task.reference,
      employeeId: task.employeeId,
      priorityId: task.priorityId,
      categoryId: task.categoryId,
      dateControl: task.dateControl,
      note: task.note,
      completed: task.completed
    });
  }

  public updateTeamliedTask(task: {
    id: any;
    title: any;
    reference: any;
    employeeId: any;
    priorityId: any;
    categoryId: any;
    dateControl: any;
    note: any;
    completed: any;
    teamliedId: any;
  }): Observable<any> {
    return this.http.post(this.conf.TASK_API + "update_teamlied", {
      id: task.id,
      title: task.title,
      reference: task.reference,
      employeeId: task.employeeId,
      priorityId: task.priorityId,
      categoryId: task.categoryId,
      dateControl: task.dateControl,
      note: task.note,
      completed: task.completed,
      teamliedId:task.teamliedId
    });
  }

  public updateCompletedTask(task: {
    id: any;
    completed: any;
  }): Observable<any> {
    return this.http.post(this.conf.TASK_API + "update_completed", {
      id: task.id,
      completed: task.completed
    });
  }

  listTask(): Observable<any> {
    return this.http.get(this.conf.TASK_API + 'all_tasks_date');
  }

  listTaskByEmployee(employee:{
    firstname:any;
    lastname:any;
  }): Observable<any> {
    return this.http.post(this.conf.TASK_API + 'employee',{
      firstname:employee.firstname,
      lastname:employee.lastname
    });
  }

  listTaskByCategory(category:{
    title:any;
  }): Observable<any> {
    return this.http.post(this.conf.TASK_API + 'category',{
      title:category.title
    });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(this.conf.TASK_API + 'id/' + id);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.get(this.conf.TASK_API + 'delete/' + id);
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
