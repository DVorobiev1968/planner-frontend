import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser, User, UserRoles} from "../models/User";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  iUser: IUser;
  user: User;
  conf: Conf;
  isAdminRole: boolean;
  isUserRole: boolean;
  isDevRole: boolean;
  isTeamlied_1Role: boolean;
  isTeamlied_2Role: boolean;
  isTeamlied_3Role: boolean;
  isAuth:boolean;


  constructor(private http: HttpClient) {
    this.conf = new Conf();
    this.isAdminRole = false;
    this.isUserRole = false;
    this.isDevRole = false;
    this.isTeamlied_1Role = false;
    this.isTeamlied_2Role = false;
    this.isTeamlied_3Role = false;
    this.isAuth=false;
    this.user=new User(0,null,null,null,null,null,null);
  }

  getRolesCurrentUser() {
    this.getCurrentUser()
      .subscribe(data => {
        this.iUser = data;
        this.setUser(this.iUser);
        this.isAdminRole = this.isAdmin(this.iUser.roles);
        this.isUserRole = this.isUser(this.iUser.roles);
        this.isDevRole = this.isDev(this.iUser.roles);
        this.isTeamlied_1Role = this.isTeamlied_1(this.iUser.roles);
        this.isTeamlied_2Role = this.isTeamlied_2(this.iUser.roles);
        this.isTeamlied_3Role = this.isTeamlied_3(this.iUser.roles);
        this.isAuth=true;
      },error => {
        console.log("Error userService.getRolesCurrentUser():",error.messages);
      });
    console.log("userService.getRolesCurrentUser():",this.iUser);
  }

  getUser(): IUser {
    return this.iUser;
  }

  getUserFIO(): string {
    return this.iUser.lastname + " " + this.iUser.initial;
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.conf.USER_API + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.conf.AUTH_API);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(this.conf.USER_API + 'update', user);
  }

  setUserId(id: number): void {
    this.user.id = id;
  }

  setUser(user: IUser): void {
    console.log("userService.setUser:",user);
    this.iUser = user;
    this.user=new User(this.iUser.id,
      this.iUser.email,
      this.iUser.username,
      this.iUser.firstname,
      this.iUser.lastname,
      this.iUser.patronymic,
      this.iUser.initial);
  }

  isDev(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_DEV") > -1;
    else
      return false;
  }

  isUser(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_USER") > -1;
    else
      return false;
  }

  isTeamlied_1(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_1") > -1;
    else
      return false;
  }

  // TODO убрать после отладки
  isTeamlied_1_test(roles: any, index: number): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_1") > -1;
    else
      return false;
  }

  isTeamlied_2(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_2") > -1;
    else
      return false;
  }

  isTeamlied_3(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_LEVEL_3") > -1;
    else
      return false;
  }

  isAdmin(roles: any): boolean {
    if (roles != null)
      return roles.indexOf("ROLE_ADMIN") > -1;
    else
      return false;
  }

  getAll(): Observable<any> {
    return this.http.get(this.conf.USER_API + "all");
  }

  delete(id: number): Observable<any> {
    return this.http.get(this.conf.USER_API + "delete/" + id);
  }

  createUsersRoles(iuser: IUser[]): UserRoles[] {
    let usersRoles: UserRoles[] = [];
    iuser.forEach(item => {
      usersRoles.push(new UserRoles(item.id, item.email, item.username, item.firstname, item.lastname, item.patronymic, item.initial, item.roles));
    })
    return usersRoles;
  }
}
