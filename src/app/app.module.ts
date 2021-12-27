import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./auth/helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./auth/helper/error-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [authInterceptorProviders,authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
