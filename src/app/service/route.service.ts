import { Injectable } from '@angular/core';
import {RouteTask} from "../models/RouteTask";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const ROUTE_TASK_API = 'http://localhost:8090/api/route/';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  routeTask:RouteTask;
  isLoadData:boolean;

  constructor(private http:HttpClient) {
    this.routeTask=new RouteTask(0,"Создан новый маршрут",0,0);
    this.isLoadData = false;
  }

  public createRouteTask(routeTask:{
    taskId: any;
    startId: any;
    destinationId: any;
    note: any;
    state: any;
  }):Observable<any>{
    return this.http.post(ROUTE_TASK_API+"add",{
      startId:routeTask.startId,
      destinationId:routeTask.destinationId,
      taskId:routeTask.taskId,
      state:routeTask.state,
      note:routeTask.note
    })
  }

  public updateRouteTask(routeTask:{
    id:any;
    taskId: any;
    startId: any;
    destinationId: any;
    note: any;
    state: any;
  }):Observable<any>{
    return this.http.post(ROUTE_TASK_API+"update",{
      id:routeTask.id,
      startId:routeTask.startId,
      destinationId:routeTask.destinationId,
      taskId:routeTask.taskId,
      state:routeTask.state,
      note:routeTask.note
    })
  }

  listRouteTask(): Observable<any> {
    return this.http.get(ROUTE_TASK_API + "all");
  }

  getRouteTaskByTaskId(id:number):Observable<any>{
    return this.http.get(ROUTE_TASK_API+"all_to_task/"+id);
  }

  getRouteTaskByStartId(id:number):Observable<any>{
    return this.http.get(ROUTE_TASK_API+"all_to_start/"+id);
  }

  delete(id:number):Observable<any>{
    return this.http.get(ROUTE_TASK_API+"delete/"+id);
  }
}
