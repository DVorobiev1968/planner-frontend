import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DocumentClass, DocumentModel} from "../models/DocumentModel";
import {TaskService} from "./task.service";

const UPLOAD_API = 'http://localhost:8090/api/docs/';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {
  docModel:DocumentClass;
  previewImgURL:any;
  documentImage: File;

  constructor(private taskService:TaskService,
              private http:HttpClient) {
    this.docModel=new DocumentClass(0,0,null,"Новый документ",
      "Файл еще не выбран",0,0);
    this.previewImgURL=null;
    this.documentImage=null;
  }

  public addDocument(document:DocumentClass): Observable<any> {
    return this.http.post(UPLOAD_API + "add", {
      name: document.name,
      file: document.file,
      employeeId: document.employeeId,
      taskId: document.taskId,
      userId: document.userId
    });
  }

  public uploadDocument(document:DocumentClass):Observable<any>{
    const uploadData = new FormData();
    uploadData.append('file', document.file);
    return this.http.post(UPLOAD_API +document.id.toString()+ "/upload", uploadData);
  }

  deleteDocument(id:number):Observable<any>{
    return this.http.get(UPLOAD_API+'delete/'+id);
  }

  getDocumentsToTask(taskId: number): any {
    return this.http.get(UPLOAD_API + taskId + '/documents');
  }

  getDocument(id: number):Observable<any>{
    return this.http.get(UPLOAD_API+id+'/document')
  }

}
