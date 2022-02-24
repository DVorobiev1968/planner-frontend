import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  conf:Conf;
  constructor(private http: HttpClient) {
    this.conf=new Conf();
  }

  listCategory(): Observable<any> {
    return this.http.get(this.conf.CATEGORY_API + 'all');
  }

}
