import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  conf: Conf;

  constructor(private http: HttpClient) {
    this.conf = new Conf();
  }

  public testHost() {
    this.http.get(this.conf.TESTING, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // }
    })
      .subscribe(res => console.log(res));
  }

  public login(user: { username: any; password: any; }): Observable<any> {
    return this.http.post(this.conf.AUTH_API + 'signin', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      username: user.username,
      password: user.password
    });
  }

  public loginOld(user: { username: any; password: any; }): Observable<any> {
    return this.http.post(this.conf.AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  public register(user: {
    email: any;
    username: any;
    firstname: any;
    lastname: any;
    patronymic: any;
    initial: any;
    password: any;
    confirmPassword: any;
  }): Observable<any> {
    return this.http.post(this.conf.AUTH_API + 'signup', {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      patronymic: user.patronymic,
      initial: user.initial,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

  public registerWithRoles(user: {
    email: any;
    username: any;
    firstname: any;
    lastname: any;
    patronymic: any;
    initial: any;
    password: any;
    confirmPassword: any;
    roles: any;
  }): Observable<any> {
    return this.http.post(this.conf.AUTH_API + 'signup_roles', {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      patronymic: user.patronymic,
      initial: user.initial,
      password: user.password,
      confirmPassword: user.confirmPassword,
      roles: user.roles
    });
  }

  public updateUser(user: {
    id: any;
    email: any;
    username: any;
    firstname: any;
    lastname: any;
    patronymic: any;
    initial: any;
    roles: any;
  }): Observable<any> {
    return this.http.post(this.conf.USER_API + 'update', {
      id:user.id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      patronymic: user.patronymic,
      initial: user.initial,
      roles: user.roles
    });
  }
}
