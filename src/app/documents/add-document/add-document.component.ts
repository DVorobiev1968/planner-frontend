import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocumentModel, IDocumentModel} from "../../models/DocumentModel";
import {DocumentUploadService} from "../../service/document-upload.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  isDataLoaded = false;
  isAddDocument = false;
  nameFile: string;
  selectedFile: File;
  previewImgURL: any;
  public _docForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.data.docService.docModel.taskId = this.data.task.id;
    this.data.docService.docModel.employeeId = this.data.task.employeeId;
    this.data.docService.docModel.userId = this.data.user.id;
    this.data.docService.docModel.note="Примечание к документу ID:";
    this.isDataLoaded = true;
    this._docForm = this._createDocForm();
  }

  _createDocForm(): FormGroup {
    return this._docForm = this.fb.group({
      name: [this.data.docService.docModel.name, Validators.required],
      nameFile: [this.data.docService.docModel.nameFile, Validators.required],
      note: [this.data.docService.docModel.note],
      file: [Validators.required]
    });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    // перед загрузкой файла сохраним в переменной preview docService
    reader.onload = () => {
      this.previewImgURL = reader.result;
      this.data.docService.previewImgURL = this.previewImgURL;
    };
  }

  renderTableAdd(){
    var itemDataSource=new DocumentModel(this.data.docService.docModel.id,
      this.data.docService.docModel.employeeId,
      null,
      this.data.docService.docModel.name,
      this.data.docService.docModel.nameFile,
      this.data.docService.docModel.note,
      this.data.docService.docModel.taskId,
      this.data.docService.docModel.userId);
    this.data.dataSource.push(itemDataSource);
    this.data.table.renderRows();
  }

  // Заполняем объект для передачи контроллеру
  onUpload(): void {
    if (this.selectedFile != null) {
      this.data.docService.docModel.nameFile = this.selectedFile.name;
      this.data.docService.docModel.file = this.selectedFile;
      this._docForm.value.nameFile = this.selectedFile.name;
      this.nameFile = this.selectedFile.name;
      console.log(this.data.docService.docModel);
      this.data.docService.uploadDocument(this.data.docService.docModel)
        .subscribe((data) => {
          this.notificationService.showSnackBar('Файл'+this.data.docService.docModel.nameFile+' загружен успешно');
          this.dialogRef.close();
          this.renderTableAdd();
          // this.router.navigate(['app-send-task']);
        }, error => {
          console.log(error.message);
          this.notificationService.showSnackBar(error.message);
        });
    }
  }

  submit(): void {
    this.data.docService.docModel.name=this._docForm.value.name;
    this.data.docService.docModel.note=this._docForm.value.note;
    this.data.docService.addDocument(this.data.docService.docModel)
      .subscribe(data => {
        console.log(data);
        this.data.docService.docModel.id=data.id;
        this.notificationService.showSnackBar('Данные вложенного документа были внесены успешно (id:'
          +this.data.docService.docModel.id+'). Выберите нужный файл.');
        this.isAddDocument = true;
      }, error => {
        this.notificationService.showSnackBar("Данные не были внесены");
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
