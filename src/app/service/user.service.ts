import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ERole} from "../models/ERole";
import {User} from "../models/User";

const USER_API = 'http://localhost:8090/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  isLoadedData: boolean;

  constructor(private http: HttpClient) {
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(USER_API + 'update', user);
  }

  setUser(user: User): void {
    this.user = user;
  }

  isUser(roles: any): boolean {
    return roles.indexOf("ROLE_USER") > -1 ? true:true;
  }

  isAdmin(roles: any): boolean {
    return roles.indexOf("ROLE_ADMIN") > -1 ? true : false;
  }

}
