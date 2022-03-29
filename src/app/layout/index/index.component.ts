import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {RouteService} from "../../service/route.service";
import {IUser} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";

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
  isDev=false;
  isTeamlied_1=false;
  isTeamlied_2=false;
  isTeamlied_3=false;
  isRolesLoaded=false;

  constructor(private userService: UserService,
              private routeService: RouteService,
              private tokenStorage: TokenStorageService) {
    this.userService.getCurrentUser()
      .subscribe(data => {
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
    this.isDev=this.userService.isDev(this.user.roles);
    this.isTeamlied_1=this.userService.isTeamlied_1(this.user.roles);
    this.isTeamlied_2=this.userService.isTeamlied_2(this.user.roles);
    this.isTeamlied_3=this.userService.isTeamlied_3(this.user.roles);
    this.isRolesLoaded=true;
  }
  getRouteTask():void{
    this.routeService.getRouteTaskByStartId(this.user.id)
    .subscribe(data=>{
      this.isRouteTaskLoaded=true;
    })

  }
}
