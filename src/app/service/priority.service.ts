import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const PRIORITY_API = 'http://localhost:8090/api/priority/';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private http:HttpClient) { }
  getPriorityById(id: number): Observable<any> {
    return this.http.get(PRIORITY_API + 'id/' + id);
  }

  listPriority():Observable<any>{
    return this.http.get(PRIORITY_API+'all');
  }
}
