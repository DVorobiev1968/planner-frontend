import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./auth/helper/auth-guard.service";
import {ListTaskComponent} from "./task/list-task/list-task.component";
import {AddTaskComponent} from "./task/add-task/add-task.component";
import {DeleteTaskComponent} from "./task/delete-task/delete-task.component";
import {DialogComponent} from "./task/dialog/dialog.component";
import {EditTaskComponent} from "./task/edit-task/edit-task.component";
import {ListDocumentsComponent} from "./documents/list-documents/list-documents.component";
import { AddDocumentComponent } from './documents/add-document/add-document.component';
import { SendTaskComponent } from "./task/send-task/send-task.component";
import { AddRouteComponent } from "./route/add-route/add-route.component";
import { ListRouteComponent } from './route/list-route/list-route.component';
import {ListReactDocsComponent} from "./documents/list-react-docs/list-react-docs.component";

const routes: Routes = [
  {path: 'app-login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuardService]},
  {path: 'edit-task', component: EditTaskComponent, canActivate: [AuthGuardService]},
  {path: 'app-send-task', component: SendTaskComponent, canActivate: [AuthGuardService]},
  {path: 'tasks', component: ListTaskComponent, canActivate: [AuthGuardService]},
  {path: 'delete-task',component: DeleteTaskComponent,canActivate:[AuthGuardService]},
  {path: 'app-dialog', component: DialogComponent, canActivate:[AuthGuardService]},
  {path: 'app-list-documents', component: ListDocumentsComponent, canActivate:[AuthGuardService]},
  {path: 'app-list-react-docs', component: ListReactDocsComponent, canActivate:[AuthGuardService]},
  {path: 'app-add-document', component: AddDocumentComponent, canActivate:[AuthGuardService]},
  {path: 'app-add-route', component: AddRouteComponent, canActivate:[AuthGuardService]},
  {path: 'app-list-route',component:ListRouteComponent, canActivate:[AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'logout', redirectTo: 'app-login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
