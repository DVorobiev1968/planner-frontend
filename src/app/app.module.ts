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
import { MomentPipe } from './shared/moment.pipe';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { StickyDirective } from './directive/sticky.directive';
import { ListDocumentsComponent } from './documents/list-documents/list-documents.component';
import { AddDocumentComponent } from './documents/add-document/add-document.component';
import { SendTaskComponent } from './task/send-task/send-task.component';
import { AddRouteComponent } from './route/add-route/add-route.component';
import { ListRouteComponent } from './route/list-route/list-route.component';
import { ListReactDocsComponent } from './documents/list-react-docs/list-react-docs.component';
import { RegisterWithRolesComponent } from './auth/register-with-roles/register-with-roles.component';
import { ListUsersComponent } from './auth/list-users/list-users.component';

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
    EditTaskComponent,
    StickyDirective,
    ListDocumentsComponent,
    AddDocumentComponent,
    MomentPipe,
    SendTaskComponent,
    AddRouteComponent,
    ListRouteComponent,
    ListReactDocsComponent,
    RegisterWithRolesComponent,
    ListUsersComponent
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
