import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {RouteService} from "../../service/route.service";
import {IUser} from "../../models/User";
import {IRouteTask} from "../../models/RouteTask";
import {TaskService} from "../../service/task.service";
import {Router} from "@angular/router";
import {ITask} from "../../models/Task";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-list-route',
  templateUrl: './list-route.component.html',
  styleUrls: ['./list-route.component.css']
})
export class ListRouteComponent implements OnInit {
  isUserDataLoaded = false;
  isRouteTaskLoaded = false;
  user:IUser;
  routeTaskList:IRouteTask[];
  task:ITask;

  constructor(private routeService: RouteService,
              private taskService: TaskService,
              private router: Router,
              private notificationService: NotificationService,
              private userService: UserService) {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });
   }

  setCurrentTask(id: number): void {
    console.log("Set task ID:" + id);
    this.taskService.getTaskById(id).subscribe(data=>{
      this.taskService.setTask(data);
      this.router.navigate(['app-send-task']);
      this.notificationService.showSnackBar("Переход на задачу");
    },error => {
      this.notificationService.showSnackBar(error);
    })
  }

  ngOnInit(): void {
  }

  getRouteByUserId():void{
    this.userService.setUser(this.user);
    this.routeService.getRouteTaskByUserId(this.user.id)
      .subscribe(data=>{
        this.routeTaskList=data;
        this.isRouteTaskLoaded=true;
        console.log(this.routeTaskList);
      });
  }

  getRouteByStartId():void{
    this.userService.setUser(this.user);
    this.routeService.getRouteTaskByStartId(this.user.id)
      .subscribe(data=>{
        this.routeTaskList=data;
        this.isRouteTaskLoaded=true;
        console.log(this.routeTaskList);
      });
  }
  getRouteByDestinationId():void{
    this.userService.setUser(this.user);
    this.routeService.getRouteTaskByDestinationId(this.user.id)
      .subscribe(data=>{
        this.routeTaskList=data;
        this.isRouteTaskLoaded=true;
        console.log(this.routeTaskList);
      });
  }

  getRouteByTaskId(taskId:number):void{
    this.routeService.getRouteTaskByTaskId(taskId)
      .subscribe(data=>{
        this.routeTaskList=data;
        this.isRouteTaskLoaded=true;
        console.log(this.routeTaskList);
      });
  }

}
