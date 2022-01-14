import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ListTaskComponent } from './task/list-task/list-task.component';
import { MatSliderModule } from '@angular/material/slider';
import { DeleteTaskComponent } from './task/delete-task/delete-task.component';
import { DialogComponent } from './task/dialog/dialog.component';
import { MomentPipe } from './service/moment.pipe';
import { EditTaskComponent } from './task/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    AddTaskComponent,
    ListTaskComponent,
    DeleteTaskComponent,
    DialogComponent,
    MomentPipe,
    EditTaskComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule
  ],
  providers: [
    authInterceptorProviders,
    authErrorInterceptorProviders
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
