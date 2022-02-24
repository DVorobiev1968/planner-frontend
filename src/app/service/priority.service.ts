import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conf} from "./Conf";


@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  conf:Conf;
  constructor(private http:HttpClient) {
    this.conf=new Conf();
  }
  getPriorityById(id: number): Observable<any> {
    return this.http.get(this.conf.PRIORITY_API + 'id/' + id);
  }

  listPriority():Observable<any>{
    return this.http.get(this.conf.PRIORITY_API+'all');
  }
}
