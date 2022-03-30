import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conf} from "./Conf";
import {IPriority} from "../models/Priority";


@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  conf: Conf;

  constructor(private http: HttpClient) {
    this.conf = new Conf();
  }

  getPriorityById(id: number): Observable<any> {
    return this.http.get(this.conf.PRIORITY_API + 'id/' + id);
  }

  listPriority(): Observable<any> {
    return this.http.get(this.conf.PRIORITY_API + 'all');
  }

  listPriorityByDay(): Observable<any> {
    return this.http.get(this.conf.PRIORITY_API + 'all_dayDesc');
  }

  addPriority(priority: IPriority): Observable<any> {
    return this.http.post(this.conf.PRIORITY_API + 'add', priority);
  }

  updatePriority(priority: IPriority): Observable<any> {
    return this.http.post(this.conf.PRIORITY_API + 'update', priority);
  }
}
