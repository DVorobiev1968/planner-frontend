import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/Employee";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  conf:Conf;
  constructor(private http: HttpClient) {
    this.conf=new Conf();
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.conf.EMPLOYEE_API + 'id/' + id);
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.post(this.conf.EMPLOYEE_API + 'update', employee);
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.conf.EMPLOYEE_API + 'add', employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.get(this.conf.EMPLOYEE_API + 'delete/' + id);
  }

  listEmployee(): Observable<any> {
    return this.http.get(this.conf.EMPLOYEE_API + 'all');
  }
}
