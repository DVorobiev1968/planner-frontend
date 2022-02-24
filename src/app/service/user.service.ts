import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ERole} from "../models/ERole";
import {IUser} from "../models/User";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;
  conf:Conf;

  constructor(private http: HttpClient) {
    this.conf=new Conf();
  }

  getUser():IUser{
    return this.user;
  }

  getUserFIO():string{
    return this.user.lastname+" "+this.user.initial;
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(this.conf.USER_API + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.conf.USER_API);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(this.conf.USER_API + 'update', user);
  }

  setUser(user: IUser): void {
    this.user = user;
  }

  isUser(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_USER") > -1 ? true : true;
    else
      return false;
  }

  isAdmin(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_ADMIN") > -1 ? true : false;
    else
      return false;
  }

  getAll():Observable<any>{
    return this.http.get(this.conf.USER_API+"all")
  }
}
