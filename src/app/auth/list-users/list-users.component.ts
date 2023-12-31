import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser, UserRoles} from "../../models/User";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users:IUser[];
  usersRoles:UserRoles[];
  isUsersLoaded:boolean;
  isAdmin:boolean;
  isUser:boolean;
  isAdministrator:boolean;
  isTeamlieder_1:boolean;
  isTeamlieder_2:boolean;
  isTeamlieder_3:boolean;


  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private router: Router) {
    this.isAdmin=true;
    this.isUser=true;
    this.isTeamlieder_1=false;
    this.isTeamlieder_2=false;
    this.isTeamlieder_3=false;
    this.isAdministrator=false;
  }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
        this.usersRoles=this.userService.createUsersRoles(data);
        this.isUsersLoaded = true;
      },error => {
        this.notificationService.showSnackBar("Пользователей не зарегистрировано");
        this.isUsersLoaded = false;
      });
  }

  //TODO удалить после отладки
  setRoles():void{
    if (this.isUsersLoaded){
      this.userService.getRolesCurrentUser();
      this.isUser=this.userService.isUserRole;
      this.isTeamlieder_1=this.userService.isTeamlied_1Role;
      this.isTeamlieder_2=this.userService.isTeamlied_2Role;
      this.isTeamlieder_3=this.userService.isTeamlied_3Role;
      this.isAdministrator=this.userService.isAdminRole;

    }

  }
  deleteUser(id:number):void{
    this.userService.delete(id)
      .subscribe(data=>{
        this.notificationService.showSnackBar(data);
      },error => {
        this.notificationService.showSnackBar(error);
      });
  }

  editUser(id:number):void{
    this.userService.getUserById(id)
      .subscribe(data=>{
        this.userService.setUser(data);
        this.router.navigate(['app-edit-user']);
      },error=>{
        this.notificationService.showSnackBar(error);
      });

  }

}
