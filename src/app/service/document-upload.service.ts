import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const UPLOAD_API = 'http://localhost:8090/api/docs/';

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {

  constructor(private http:HttpClient) { }
  uploadDocumentToUser(taskId:number,file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(UPLOAD_API + 'upload', uploadData);
  }

  uploadDocumentToTask(file: File, taskId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(UPLOAD_API + taskId + '/upload', uploadData);
  }

  getDocumentsToTask(taskId: number): any {
    return this.http.get(UPLOAD_API + taskId + '/documents');
  }

  getDocument(id: number):Observable<any>{
    return this.http.get(UPLOAD_API+id+'/document')
  }

  addDocument(docModel:any):Observable<any>{
    return this.http.post(UPLOAD_API+'/add',docModel);
  }

}
