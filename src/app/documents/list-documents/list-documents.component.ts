import {Component, OnInit} from '@angular/core';
import {IDocumentModel} from "../../models/DocumentModel";
import {DocumentUploadService} from "../../service/document-upload.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";
import {TaskService} from "../../service/task.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddDocumentComponent} from "../add-document/add-document.component";
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {
  isDocsLoaded:boolean;
  isUserDataLoaded:boolean;
  isPreview:boolean;
  docs: IDocumentModel[];
  user: IUser;
  taskId:number;
  previewImgURL:any;
  typePreview:string[];
  isImage:boolean;
  isPDF:boolean;
  isOther:boolean;
  header:string;
  a:any;
  objectUrl:any;


  constructor(  private docService: DocumentUploadService,
                private userService: UserService,
                public taskService: TaskService,
                private notificationService: NotificationService,
                private dialog: MatDialog,
                private router: Router) {
    this.taskId=taskService.task.id;
    this.isDocsLoaded = false;
    this.isUserDataLoaded = false;
    this.isPreview = false;
    this.isImage=false;
    this.isPDF=false;
    this.isOther=false;
    this.header="Просмотр вложенных документов:";
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
    this.loadDocs(this.taskId);
  }

  back(){
    this.router.navigate(['app-send-task']);
  }

  loadDocs(taskId:number){
    this.docService.getDocumentsToTask(taskId)
      .subscribe(data =>{
        this.docs=data;
        this.isDocsLoaded=true;
        },error => {
          this.header="Прикрепленные документы отсутствуют";
          this.notificationService.showSnackBar(this.header);
          this.isDocsLoaded=true;
        });
  }

  viewDocExtend(id:number, nameFile:string){
    this.isImage=false;
    this.isPDF=false;
    this.docService.getDocument(id)
      .subscribe(data=>{
        this.previewImgURL=data.docBytes;
        this.typePreview=nameFile.split(".");
        this.isPreview=true;
        this.isPDF=this.typePreview[1].includes("pdf");
        this.isImage=this.typePreview[1].includes("jpg");
        this.isOther=this.isPDF || this.isImage? false:true;
        this.notificationService.showSnackBar("Файл для просмотра загружен успешно");
      },error => {
        this.notificationService.showSnackBar("Файл для просмотра загрузить не удалось!");
        });
  }

  downloadToFile(id:number,nameFile:string){
    this.docService.download(id)
      .subscribe(blob => {
        fileSaver.saveAs(blob,nameFile);
      },error => {
        this.notificationService.showSnackBar("Ошибка при загрузке файла!");
      })
  }

  downloadToAnchor(id:number,nameFile:string){
    this.docService.download(id)
      .subscribe(blob => {
      this.a = document.createElement('a');
      this.objectUrl = URL.createObjectURL(blob);
      this.a.href = this.objectUrl;
      this.a.download = 'nameFile';
      this.a.click();
      URL.revokeObjectURL(this.objectUrl);
    })
  }

  downloadDoc(id:number, nameFile:string){
    this.docService.getDocument(id)
      .subscribe(data=> {
        this.previewImgURL = data.docBytes;
        let blob:any = new Blob([data.docBytes], { type: 'application/pdf; charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        fileSaver.saveAs(blob,nameFile);
        this.notificationService.showSnackBar("Файл был загружен успешно");
      },error => {
        this.notificationService.showSnackBar("Файл загрузить не удалось!");
      });
  }

  formatUni(obj: any):any{
    if (this.isPreview){
      if (this.typePreview[1].includes("pdf")){
        this.isPDF=true;
        return this.formatPdf(obj);
      }
      else{
        this.isImage=true;
        return this.formatImage(obj);
      }
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
    return 'application/pdf,' + pdf;
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
      this.notificationService.showSnackBar(data.message);
    });
    this.router.navigate(["app-send-task"]);
  }
}
