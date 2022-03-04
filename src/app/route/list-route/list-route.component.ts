import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {RouteService} from "../../service/route.service";
import {IUser} from "../../models/User";
import {IRouteTask} from "../../models/RouteTask";

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

  constructor(private routeService: RouteService,
              private userService: UserService) {
   }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });
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
