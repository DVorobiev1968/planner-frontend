import {Component, OnInit, ViewChild} from '@angular/core';
import {DocumentModel, IDocumentModel} from "../../models/DocumentModel";
import {MatTable} from "@angular/material/table";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {DocumentUploadService} from "../../service/document-upload.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";
import {AddDocumentComponent} from "../add-document/add-document.component";

@Component({
  selector: 'app-list-react-docs',
  templateUrl: './list-react-docs.component.html',
  styleUrls: ['./list-react-docs.component.css']
})
export class ListReactDocsComponent implements OnInit {
  taskId=1;
  displayedColumns: string[] = ['id', 'name', 'nameFile', 'date'];
  dataSource: DocumentModel[];
  itemDataSourse:DocumentModel;
  @ViewChild(MatTable) table: MatTable<IDocumentModel>;

  user: IUser;
  isUserDataLoaded = false;
  documents: IDocumentModel[];
  clickedRows = new Set<DocumentModel>();

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
  }

  setDocuments(documents:IDocumentModel[]){

  }

  ngOnInit(): void {
    // TODO пока для отладки
    this.taskService.getTaskById(this.taskId)
      .subscribe(data=>{
        console.log(data);
        this.taskService.task=data;
        this.taskService.setCurrentTaskId(this.taskId);
      },error => {
        this.taskService.task=null;
      });
  }
  viewDocs(){
    if (this.taskService.task!=null){
      this.docService.getDocumentsToTask(this.taskService.task.id)
        .subscribe(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
    }
  }

  openEditDialog(): void {
    const dialogAddDocConfig = new MatDialogConfig();
    dialogAddDocConfig.width = '600px';
    dialogAddDocConfig.data = {
      task: this.taskService.task,
      docService: this.docService,
      user: this.user,
      table: this.table,
      itemDataSourse:this.itemDataSourse,
      dataSource:this.dataSource
    };
    this.dialog.open(AddDocumentComponent, dialogAddDocConfig);
  }

  deleteDocument(id: number): void {
    this.docService.deleteDocument(id).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar(data.message);
    });
  }

  viewDocument(id: number): void {
    this.docService.getDocument(id).subscribe(data => {
      console.log(data);
    })
  }

  addFromDialog(){
    this.openEditDialog();
  }
  // TODO в разработке
  removeData(){
    // this.dataSource.pop();
    // this.table.renderRows();

  }

}
