import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const CATEGORY_API = 'http://localhost:8090/api/category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  listCategory(): Observable<any> {
    return this.http.get(CATEGORY_API + 'all');
  }

}
