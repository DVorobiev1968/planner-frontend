import {Component, OnInit} from '@angular/core';
import {PriorityService} from "../../service/priority.service";
import {CategoryService} from "../../service/category.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";
import {IPriority} from "../../models/Priority";

@Component({
  selector: 'app-list-priority',
  templateUrl: './list-priority.component.html',
  styleUrls: ['./list-priority.component.css']
})
export class ListPriorityComponent implements OnInit {
  isUserDataLoaded = false;
  isPriorityLoaded = false;
  isAdmin = false;

  user: IUser;
  priorities: IPriority[];

  constructor(
    private priorityService: PriorityService,
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router) {

    this.userService.getRolesCurrentUser();

    this.priorityService.listPriority()
      .subscribe(data => {
        this.priorities = data;
        this.isPriorityLoaded = true;
      });

  }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdminRole;
  }

  deletePriority(index: number) {
    console.log(index);
  }

  updatePriority(index: number) {
    console.log(this.priorities[index]);

  }

  addPriority(index: number) {
    console.log(index);
  }

}
