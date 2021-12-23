import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/Employee";

const USER_API = 'http://localhost:8090/api/employee/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(USER_API + 'id/' + id);
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.post(USER_API + 'update', employee);
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(USER_API + 'add', employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.get(USER_API + 'delete/' + id);
  }

  listEmployee(): Observable<any> {
    return this.http.get(USER_API + 'all');
  }
}
