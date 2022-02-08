import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {RouteService} from "../../service/route.service";
import {User} from "../../models/User";
import {IRouteTask} from "../../models/RouteTask";

@Component({
  selector: 'app-list-route',
  templateUrl: './list-route.component.html',
  styleUrls: ['./list-route.component.css']
})
export class ListRouteComponent implements OnInit {
  isUserDataLoaded = false;
  isRouteTaskLoaded = false;
  user:User;
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

  getRouteTask():void{
    this.userService.setUser(this.user);
    this.routeService.getRouteTaskByStartId(this.user.id)
      .subscribe(data=>{
        console.log(data);
        this.routeTaskList=data;
        this.isRouteTaskLoaded=true;
      });
  }

}
