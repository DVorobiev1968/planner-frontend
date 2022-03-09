import { Component, OnInit } from '@angular/core';
import { IDocumentModel } from "../../models/DocumentModel";
import {DocumentUploadService} from "../../service/document-upload.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";
import {TaskService} from "../../service/task.service";

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
  previewImgURL:any;
  typePreview:string[];

  constructor(  private docsService: DocumentUploadService,
                private userService: UserService,
                public taskService: TaskService,
                private notificationService: NotificationService,
                private router: Router) {
                this.taskId=taskService.task.id;
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

  viewDoc(id:number, nameFile:string){
    console.log(id);
    this.docsService.getDocument(id)
      .subscribe(data=>{
        this.previewImgURL=data.docBytes;
        this.typePreview=nameFile.split(".");
        console.log(this.typePreview[-1]);
      })
  }

  formatUni(img:any):any{

  }
  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  formatPdf(pdf: any): any {
    if (pdf == null) {
      return null;
    }
    return 'data:pdf/pdf;base64,' + pdf;
  }

}
