import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isUserDataLoaded = false;
  user:User;
  isAdmin=false;
  isUser=false;
  isRolesLoaded=false;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });
    // this.userService.setUser(this.user);
    // this.isAdmin=this.userService.isAdmin(this.user.roles);
    // this.isUser=this.userService.isUser(this.user.roles)
    }
  ngOmLoad():void{
    this.userService.setUser(this.user);
    this.isAdmin=this.userService.isAdmin(this.user.roles);
    this.isUser=this.userService.isUser(this.user.roles);
    this.isRolesLoaded=true;
  }
}
