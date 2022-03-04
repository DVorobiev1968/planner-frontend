import { Injectable } from '@angular/core';
import {Conf} from "./Conf";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  conf:Conf;

  constructor() {
    this.conf=new Conf();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.conf.TOKEN_KEY);
    window.sessionStorage.setItem(this.conf.TOKEN_KEY, token);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(this.conf.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.conf.USER_KEY);
    window.sessionStorage.setItem(this.conf.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(<string>sessionStorage.getItem(this.conf.USER_KEY));
  }

  logOut(): void {
    window.sessionStorage.clear();
    // window.location.reload();
  }
}
