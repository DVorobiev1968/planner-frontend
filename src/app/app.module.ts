import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./auth/helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./auth/helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { AddTaskComponent } from './task/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    AddTaskComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    authInterceptorProviders,
    authErrorInterceptorProviders
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
