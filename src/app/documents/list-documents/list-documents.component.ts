import { Component, OnInit } from '@angular/core';
import { DocumentModel } from "../../models/DocumentModel";
import {DocumentUploadService} from "../../service/document-upload.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {
  isDocsLoaded = false;
  isUserDataLoaded = false;
  docs: DocumentModel[];
  user: User;
  taskId:number;
  selectedFile: File;
  previewImgURL:any;

  constructor(  private docsService: DocumentUploadService,
                private userService: UserService,
                private notificationService: NotificationService,
                private router: Router) {
                this.taskId=99;
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
        },error => {
               this.notificationService.showSnackBar("Прикрепленные документы отсутствуют");
        });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    // перед загрузкой файла покажем preview
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

//   openEditDialog(): void {
//     const dialogUserEditConfig = new MatDialogConfig();
//     dialogUserEditConfig.width = '400px';
//     dialogUserEditConfig.data = {
//       user: this.user
//     };
//     this.dialog.open(EditUserComponent, dialogUserEditConfig);
//   }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
  // агрузка файла
  onUpload(): void {
    if (this.selectedFile != null) {
      this.docsService.uploadDocumentToTask(this.selectedFile,this.taskId)
        .subscribe(() => {
          this.notificationService.showSnackBar('Document updated successfully');
        });
    }
  }

}
