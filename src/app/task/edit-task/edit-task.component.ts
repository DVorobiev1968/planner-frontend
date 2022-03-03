import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../models/User";
import {CurrentTask, ITask} from "../../models/Task";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {Employee} from "../../models/Employee";
import {Priority} from "../../models/Priority";
import {EmployeeService} from "../../service/employee.service";
import {PriorityService} from "../../service/priority.service";
import {CategoryService} from "../../service/category.service";
import {Observable} from "rxjs";
import {variable} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {
  _taskEditForm: FormGroup;
  isUserDataLoaded = false;
  isTaskDataLoaded = false;
  isEmployeesLoaded = false;
  isPriorityLoaded = false;
  isUsersLoaded = false;

  isLogs = false;

  isAdmin = false;
  isUser = false;
  isRolesLoaded = false;

  user: IUser;
  users: IUser[];
  title: string;
  reference: string;
  note: string;
  dateControl: Date;
  employees: Employee[];
  priorities: Priority[];
  logs: Object;

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private categoryService: CategoryService,
              private userService: UserService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private router: Router) {
    this.title = "";
    this.note = "";
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.employeeService.listEmployee()
      .subscribe(data => {
        console.log(data);
        this.employees = data;
        this.isEmployeesLoaded = true;
      });

    this.priorityService.listPriority()
      .subscribe(data => {
        console.log(data);
        this.priorities = data;
        this.isPriorityLoaded = true;
      });
    this.userService.getAll()
      .subscribe(data => {
        console.log(data);
        this.users = data;
        this.isUsersLoaded = true;
      })
  }

  ngOnInit(): void {

    console.log(this.taskService.task);
    // this.isTaskDataLoaded = this.taskService.isLoadData;
    // this._editTaskFormBuilder();
    this.logs = "Loggin back-enf request..."
  }

  ngOmLoad(): void {
    this.userService.setUser(this.user);
    this.isAdmin = this.userService.isAdmin(this.user.roles);
    this.isUser = this.userService.isUser(this.user.roles);
    this.isRolesLoaded = true;
    this._editTaskFormBuilder();
  }

  _editTaskFormBuilder() {
    this._taskEditForm = this.fb.group({
      title: [this.taskService.task.title, Validators.required],
      reference: [this.taskService.task.reference, Validators.required],
      employeeFio: [this.taskService.task.employee.fio],
      employee: [this.employees, Validators.required],
      priority: [this.priorities, Validators.required],
      categoryId: 1,
      dateControl: [this.taskService.task.dateControl, Validators.required],
      strDateControl: [this.taskService.task.strDateControl],
      note: [this.taskService.task.note],
      teamlied: [this.users]
    });
    this.isTaskDataLoaded = this.taskService.isLoadData;
    console.log(this.isTaskDataLoaded);
  }

  submit(isAdmin:boolean): void {
    console.log(this._taskEditForm.value);
    this.logs = this._taskEditForm.value;
    if (isAdmin){
      this.taskService.updateTeamliedTask({
        id: this.taskService.task.id,
        title: this._taskEditForm.value.title,
        reference: this._taskEditForm.value.reference,
        employeeId: this._taskEditForm.value.employee,
        priorityId: this._taskEditForm.value.priority,
        categoryId: this._taskEditForm.value.categoryId,
        dateControl: this._taskEditForm.value.dateControl,
        note: this._taskEditForm.value.note,
        completed: this.taskService.task.completed,
        teamliedId:this._taskEditForm.value.teamlied
      }).subscribe(data => {
        console.log(data);
        this.notificationService.showSnackBar('Данные обновлены успешно');
        window.location.reload();
      }, error => {
        console.log(error.message);
        this.notificationService.showSnackBar(error.message);
      });

    }
    else {
      this.taskService.updateTask({
        id: this.taskService.task.id,
        title: this._taskEditForm.value.title,
        reference: this._taskEditForm.value.reference,
        employeeId: this._taskEditForm.value.employee,
        priorityId: this._taskEditForm.value.priority,
        categoryId: this._taskEditForm.value.categoryId,
        dateControl: this._taskEditForm.value.dateControl,
        note: this._taskEditForm.value.note,
        completed: this.taskService.task.completed
      }).subscribe(data => {
        console.log(data);
        this.notificationService.showSnackBar('Данные обновлены успешно');
        window.location.reload();
      }, error => {
        console.log(error.message);
        this.notificationService.showSnackBar(error.message);
      });
    }
  }

}
