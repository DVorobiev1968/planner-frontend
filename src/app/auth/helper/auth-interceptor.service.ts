import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../service/token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{


  constructor(private tokenService: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return undefined;
  }
}
export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];
