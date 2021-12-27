import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8090/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  public login(user: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  public register(user: {
    email: any; username: any;
    firstname: any;
    lastname: any;
    patronymic:any;
    initial:any;
    password: any;
    confirmPassword: any;
  }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      patronymic:user.patronymic,
      initial:user.initial,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

}
