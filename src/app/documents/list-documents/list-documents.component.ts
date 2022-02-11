import { Component, OnInit } from '@angular/core';
import { IDocumentModel } from "../../models/DocumentModel";
import {DocumentUploadService} from "../../service/document-upload.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {
  isDocsLoaded = false;
  isUserDataLoaded = false;
  docs: IDocumentModel[];
  user: IUser;
  taskId:number;
  selectedFile: File;
  previewImgURL:any;

  constructor(  private docsService: DocumentUploadService,
                private userService: UserService,
                private notificationService: NotificationService,
                private router: Router) {
                this.taskId=1;
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.docsService.getDocumentsToTask(this.taskId)
      .subscribe(data =>{
        console.log(data);
        this.docs=data;
        this.isDocsLoaded=true;
        },error => {
               this.notificationService.showSnackBar("Прикрепленные документы отсутствуют");
        });
  }
}
