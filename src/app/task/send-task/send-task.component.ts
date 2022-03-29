import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/User";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {IDocumentModel} from "../../models/DocumentModel";

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.component.html',
  styleUrls: ['./send-task.component.css']
})
export class SendTaskComponent implements OnInit {
  user: IUser;
  isUserDataLoaded = false;
  documents: IDocumentModel[];
  previewImgURL:any;
  typePreview:string[];
  isPreview:boolean;

  constructor(public taskService: TaskService,
              private userService: UserService,
              private router: Router) {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
  }

  ngOnInit(): void {
  }

  listDocs(){
    this.router.navigate(['app-list-documents']);
  }

  sendTask(): void {
    this.userService.setUser(this.user);
    this.router.navigate(['app-add-route']);
  }
}
