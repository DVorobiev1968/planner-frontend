import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/User";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddDocumentComponent} from "../../documents/add-document/add-document.component";
import {DocumentUploadService} from "../../service/document-upload.service";
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
              private docService: DocumentUploadService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private router: Router) {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });
    this.docService.getDocumentsToTask(taskService.task.id)
      .subscribe(data => {
        console.log(data);
        this.documents = data;
      });
    this.isPreview=false;
  }

  ngOnInit(): void {
  }

  reload(){
    console.log(this.taskService.task);
    this.router.navigate(['app-send-task']);
    window.location.reload();
    console.log("reload():");
  }

  openEditDialog(): void {
    const dialogAddDocConfig = new MatDialogConfig();
    dialogAddDocConfig.width = '600px';
    dialogAddDocConfig.data = {
      task: this.taskService.task,
      docService: this.docService,
      user: this.user
    };
    this.dialog.open(AddDocumentComponent, dialogAddDocConfig);
  }

  deleteDocument(id: number): void {
    this.docService.deleteDocument(id).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar(data.message);
    });
    this.router.navigate(["app-send-task"]);
  }

  viewDocExtend(id:number, nameFile:string){
    console.log(id);
    this.docService.getDocument(id)
      .subscribe(data=>{
        this.previewImgURL=data.docBytes;
        this.typePreview=nameFile.split(".");
        this.isPreview=true;
        console.log(this.typePreview[1]);
      })
  }

  viewDoc(id:number){
    console.log(id);
    this.docService.getDocument(id)
      .subscribe(data=>{
        this.previewImgURL=data.docBytes;
      })
  }

  formatUni(obj: any):any{
    if (this.isPreview){
      if (this.typePreview[1].includes("pdf"))
        return this.formatPdf(obj);
      else
        return this.formatImage(obj);
    }
    else
      return null;
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

  sendTask(): void {
    this.userService.setUser(this.user);
    this.router.navigate(['app-add-route']);
  }
}
