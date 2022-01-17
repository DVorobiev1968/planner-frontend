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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuardService]},
  {path: 'edit-task', component: EditTaskComponent, canActivate: [AuthGuardService]},
  {path: 'tasks', component: ListTaskComponent, canActivate: [AuthGuardService]},
  {path: 'delete-task',component: DeleteTaskComponent,canActivate:[AuthGuardService]},
  {path: 'app-dialog', component: DialogComponent, canActivate:[AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'logout', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
