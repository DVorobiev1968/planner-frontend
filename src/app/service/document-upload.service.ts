import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DocumentModel, IDocumentModel} from "../models/DocumentModel";
import {TaskService} from "./task.service";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {
  docModel:DocumentModel;
  previewImgURL:any;
  documentImage: File;
  iDocModel:IDocumentModel;
  conf:Conf;

  constructor(private taskService:TaskService,
              private http:HttpClient) {
    this.docModel=new DocumentModel(1,1,null,"Новый документ","Файл еще не выбран","",1,1);
    this.previewImgURL=null;
    this.documentImage=null;
    this.conf=new Conf();
  }

  public addDocument(document:DocumentModel): Observable<any> {
    return this.http.post(this.conf.UPLOAD_API + "add", {
      name: document.name,
      file: document.file,
      employeeId: document.employeeId,
      taskId: document.taskId,
      userId: document.userId,
      note:document.note
    });
  }

  public uploadDocument(document:DocumentModel):Observable<any>{
    const uploadData = new FormData();
    uploadData.append('file', document.file);
    return this.http.post(this.conf.UPLOAD_API +document.id+ "/upload", uploadData);
  }

  deleteDocument(id:number):any{
    return this.http.get(this.conf.UPLOAD_API+'delete/'+id);
  }

  getDocumentsToTask(taskId: number): any {
    return this.http.get(this.conf.UPLOAD_API + taskId + '/documents');
  }

  getDocument(id: number):Observable<any>{
    return this.http.get(this.conf.UPLOAD_API+id+'/document')
  }

}
