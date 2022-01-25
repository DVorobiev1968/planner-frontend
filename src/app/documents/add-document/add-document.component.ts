import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DocumentModel } from "../../models/DocumentModel";
import {DocumentUploadService} from "../../service/document-upload.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  isUserDataLoaded = false;
  user: User;
  selectedFile: File;
  previewImgURL:any;
  public _docForm: FormGroup;

  constructor(  private dialogRef: MatDialogRef<AddDocumentComponent>,
                private docsService: DocumentUploadService,
                private userService: UserService,
                @Inject(MAT_DIALOG_DATA) public data,
                private notificationService: NotificationService,
                private fb: FormBuilder,
                private router: Router) {
  }
  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
    this._docForm=this._createDocForm();

  }

  _createDocForm(): FormGroup{
    return this._docForm=this.fb.group({
      name: [
      Validators.compose([Validators.required])
      ],
      note: [
      Validators.compose([Validators.required])
      ]
    });
  }

  submit():void{
    this.docsService.addDocument(this.addDoc())
      .subscribe(()=>{
        this.notificationService.showSnackBar('User updated successfully');
        this.dialogRef.close();
      });
  }

  private addDoc():DocumentModel{
    this.data.name=this._docForm.value.name;
    this.data.note=this._docForm.value.note;
    return this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
