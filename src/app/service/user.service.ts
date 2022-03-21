import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ERole} from "../models/ERole";
import {IUser, User} from "../models/User";
import {Conf} from "./Conf";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  iUser: IUser;
  user: User;
  conf:Conf;
  isAdminRole:boolean;
  isUserRole:boolean;
  isDevRole:boolean;
  isTeamlied_1Role:boolean;
  isTeamlied_2Role:boolean;
  isTeamlied_3Role:boolean;

  constructor(private http: HttpClient) {
    this.conf=new Conf();
    this.isAdminRole=false;
    this.isUserRole=false;
    this.isDevRole=false;
    this.isTeamlied_1Role=false;
    this.isTeamlied_2Role=false;
    this.isTeamlied_3Role=false;
  }

  getRoles(){
      this.getCurrentUser()
        .subscribe(data=>{
          this.iUser=data;
      })
      this.setUser(this.iUser);
      this.isAdminRole=this.isAdmin(this.iUser.roles);
      this.isUserRole=this.isUser(this.iUser.roles);
      this.isDevRole=this.isDev(this.iUser.roles);
      this.isTeamlied_1Role=this.isTeamlied_1(this.iUser.roles);
      this.isTeamlied_2Role=this.isTeamlied_2(this.iUser.roles);
      this.isTeamlied_3Role=this.isTeamlied_3(this.iUser.roles);
  }

  getUser():IUser{
    return this.iUser;
  }

  getUserFIO():string{
    return this.iUser.lastname+" "+this.iUser.initial;
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(this.conf.USER_API + id);
  }

  getCurrentUser(): Observable<any> {
    // return this.http.get(this.conf.USER_API);
    // TODO убрать после отладки
    return this.http.get(this.conf.AUTH_API);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(this.conf.USER_API + 'update', user);
  }

  setUser(user: IUser): void {
    this.iUser = user;
  }

  isDev(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_DEV") > -1 ? true : false;
    else
      return false;
  }

  isUser(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_USER") > -1 ? true : false;
    else
      return false;
  }

  isTeamlied_1(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_1") > -1 ? true : false;
    else
      return false;
  }
  isTeamlied_2(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_2") > -1 ? true : false;
    else
      return false;
  }
  isTeamlied_3(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_3") > -1 ? true : false;
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
    return this.http.get(this.conf.USER_API+"all");
  }
  delete(id:number):Observable<any>{
    return this.http.get(this.conf.USER_API+"delete/"+id);
  }
}
