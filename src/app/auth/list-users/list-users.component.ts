import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users:IUser[];
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
        console.log(data);
        this.users = data;
        this.isUsersLoaded = true;
      },error => {
        this.notificationService.showSnackBar("Пользователей не зарегистрировано");
        this.isUsersLoaded = false;
      });
  }


}
