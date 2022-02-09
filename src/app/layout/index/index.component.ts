import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {RouteService} from "../../service/route.service";
import {IUser} from "../../models/User";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isUserDataLoaded = false;
  isRouteTaskLoaded = false;
  user:IUser;
  isAdmin=false;
  isUser=false;
  isRolesLoaded=false;

  constructor(private userService: UserService,
              private routeService: RouteService) {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });
  }

  ngOnInit(): void {
    }
  ngOmLoad():void{
    this.userService.setUser(this.user);
    this.isAdmin=this.userService.isAdmin(this.user.roles);
    this.isUser=this.userService.isUser(this.user.roles);
    this.isRolesLoaded=true;
  }
  getRouteTask():void{
    this.routeService.getRouteTaskByStartId(this.user.id)
    .subscribe(data=>{
      console.log(data);
      this.isRouteTaskLoaded=true;
    })

  }
}
