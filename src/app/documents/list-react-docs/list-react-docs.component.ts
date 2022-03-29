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
import {DialogComponent} from "../../task/dialog/dialog.component";

@Component({
  selector: 'app-list-react-docs',
  templateUrl: './list-react-docs.component.html',
  styleUrls: ['./list-react-docs.component.css']
})
export class ListReactDocsComponent implements OnInit {
  title:string;
  action:string;
  taskId=90
  displayedColumns: string[] = ['id', 'name', 'nameFile','note','date','disabled'];
  dataSource: Array<DocumentModel>;
  isDataSourceLoaded=false;
  isTaskLoaded=false;
  itemDataSource:DocumentModel;

  @ViewChild(MatTable) table: MatTable<IDocumentModel>;

  user: IUser;
  isUserDataLoaded = false;
  documents: DocumentModel[];
  clickedRows = new Set<DocumentModel>();

  constructor(public taskService: TaskService,
              private userService: UserService,
              private docService: DocumentUploadService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private router: Router) {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });
    // TODO пока для отладки
    this.taskService.getTaskById(this.taskId)
      .subscribe(data=>{
        this.taskService.task=data;
        this.taskService.setCurrentTaskId(this.taskId);
        this.isTaskLoaded=true;
      },error => {
        this.taskService.task=null;
        this.isTaskLoaded=true;
      });
    this.dataSource=new Array<DocumentModel>();
    this.viewDocs();
  }

  setDocuments(documents:IDocumentModel[]){

  }

  ngOnInit(): void {
  }
  viewDocs(){
    if (this.taskService.task!=null){
      this.docService.getDocumentsToTask(this.taskService.task.id)
        .subscribe(data => {
          data.forEach(docs=>{
            this.itemDataSource=new DocumentModel(docs);
            this.dataSource.push(this.itemDataSource);
            this.table.dataSource=data;
          });
          // this.table.dataSource=this.dataSource;
          this.isDataSourceLoaded=true;
        });
    }
  }
  /** Диалог при добавлении прикрепляемых файлов */
  openEditDialog(): void {
    const dialogAddDocConfig = new MatDialogConfig();
    dialogAddDocConfig.width = '600px';
    dialogAddDocConfig.data = {
      task: this.taskService.task,
      docService: this.docService,
      user: this.user,
      table: this.table,
      itemDataSource:this.itemDataSource,
      dataSource:this.dataSource
    };
    this.dialog.open(AddDocumentComponent, dialogAddDocConfig);
  }

  findElementArray(docs:any, id:number): number {
    let index=0;
    docs.forEach(docs=>{
      if (docs.id==id)
        return  index;
      index++;
    });
    return index;
  }

  deleteDocument(id: number): void {
    this.docService.deleteDocument(id)
      .subscribe(data => {
      this.notificationService.showSnackBar(data);
      let index=0;
      index=this.findElementArray(this.table.dataSource, id);
    },error => {
        this.notificationService.showSnackBar(error);
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

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  removeDataItem(id:number, nameFile:string) {
    this.openDialog(id);
  }

  /** Диалог при удалении прикрепляемых файлов */
  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: this.title, action: this.action},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action = result;
      if (this.action){
        // удаляем из БД
        console.log('удаляем из БД document_id: '+id);
        this.deleteDocument(id);
        //TODO обновление this.table._data(_dataSource)
        this.viewDocs();
        this.table.renderRows();
      }
    });
  }

}
