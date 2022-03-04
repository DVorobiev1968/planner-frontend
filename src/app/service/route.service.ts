import { Injectable } from '@angular/core';
import {RouteTask} from "../models/RouteTask";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conf} from "./Conf";


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  routeTask:RouteTask;
  isLoadData:boolean;
  conf:Conf;

  constructor(private http:HttpClient) {
    this.routeTask=new RouteTask(0,"Создан новый маршрут",1,1);
    this.isLoadData = false;
    this.conf=new Conf();
  }

  public createRouteTask(routeTask:{
    taskId: any;
    startId: any;
    destinationId: any;
    note: any;
    state: any;
  }):Observable<any>{
    console.log(routeTask);
    return this.http.post(this.conf.ROUTE_TASK_API+"add",{
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
    return this.http.post(this.conf.ROUTE_TASK_API+"update",{
      id:routeTask.id,
      startId:routeTask.startId,
      destinationId:routeTask.destinationId,
      taskId:routeTask.taskId,
      state:routeTask.state,
      note:routeTask.note
    })
  }

  listRouteTask(): Observable<any> {
    return this.http.get(this.conf.ROUTE_TASK_API + "all");
  }

  getRouteTaskByTaskId(id:number):Observable<any>{
    return this.http.get(this.conf.ROUTE_TASK_API+"all_to_task/"+id);
  }

  getRouteTaskByUserId(id:number):Observable<any>{
    return this.http.get(this.conf.ROUTE_TASK_API+"all_to_user/"+id);
  }

  getRouteTaskByStartId(id:number):Observable<any>{
    return this.http.get(this.conf.ROUTE_TASK_API+"all_to_start/"+id);
  }

  getRouteTaskByDestinationId(id:number):Observable<any>{
    return this.http.get(this.conf.ROUTE_TASK_API+"all_to_dest/"+id);
  }

  delete(id:number):Observable<any>{
    return this.http.get(this.conf.ROUTE_TASK_API+"delete/"+id);
  }
}
