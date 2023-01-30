import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {IUser} from "../../models/User";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {IEmployee} from "../../models/IEmployee";
import {IPriority} from "../../models/Priority";
import {EmployeeService} from "../../service/employee.service";
import {PriorityService} from "../../service/priority.service";
import {CategoryService} from "../../service/category.service";
import {ICategory} from "../../models/ICategory";

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
  isCategoryLoaded = false;
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
  employees: IEmployee[];
  priorities: IPriority[];
  categories: ICategory[];
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
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.employeeService.listEmployee()
      .subscribe(data => {
        this.employees = data;
        this.isEmployeesLoaded = true;
      });

    this.priorityService.listPriority()
      .subscribe(data => {
        this.priorities = data;
        this.isPriorityLoaded = true;
      });

    this.categoryService.listCategory()
      .subscribe(data => {
        this.categories = data;
        this.isCategoryLoaded = true;
      });

    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
        this.isUsersLoaded = true;
      })
  }

  ngOnInit(): void {

    this.logs = "Loggin back-enf request...";
  }

  ngOmLoad(): void {
    this.userService.setUser(this.user);
    this.isAdmin = this.userService.isAdmin(this.user.roles);
    this.isUser = this.userService.isUser(this.user.roles);
    this.isRolesLoaded = true;
    this._editTaskFormBuilder();
    console.log(this._taskEditForm.invalid);
  }

  _editTaskFormBuilder() {
    this._taskEditForm = this.fb.group({
      title: new FormControl({value: this.taskService.task.title, disabled: false}, Validators.required),
      reference: new FormControl({value: this.taskService.task.reference, disabled: false}, Validators.required),
      employeeFio: new FormControl({value: this.taskService.task.employee.fio}, Validators.required),
      employee: new FormControl({value: this.taskService.task.employee.id, disabled: !this.isEmployeesLoaded}, Validators.required),
      priority: new FormControl({value: this.taskService.task.priority.id, disabled: !this.isPriorityLoaded}, Validators.required),
      category: new FormControl({value: this.taskService.task.category.id, disabled: !this.isCategoryLoaded}, Validators.required),
      dateControl: new FormControl({value: this.taskService.task.dateControl, disabled:false}, Validators.required),
      strDateControl: this.taskService.task.strDateControl,
      note: new FormControl({value: this.taskService.task.note, disabled: false}),
      teamlied: new FormControl({value: this.userService.user.id, disabled:false}, Validators.required)
    });
    this.isTaskDataLoaded = this.taskService.isLoadData;
  }

  submit(isAdmin: boolean): void {
    this.logs = this._taskEditForm.value;
    if (isAdmin) {
      this.taskService.updateTeamliedTask({
        id: this.taskService.task.id,
        title: this._taskEditForm.value.title,
        reference: this._taskEditForm.value.reference,
        employeeId: this._taskEditForm.value.employee,
        priorityId: this._taskEditForm.value.priority,
        categoryId: this._taskEditForm.value.category,
        dateControl: this._taskEditForm.value.dateControl,
        note: this._taskEditForm.value.note,
        completed: this.taskService.task.completed,
        teamliedId: this._taskEditForm.value.teamlied
      }).subscribe(data => {
        this.notificationService.showSnackBar('Данные обновлены успешно');
        this.router.navigate(['tasks']);
      }, error => {
        this.notificationService.showSnackBar(error.message);
        this.router.navigate(['main']);
      });

    } else {
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
        this.notificationService.showSnackBar('Данные обновлены успешно');
        window.location.reload();
      }, error => {
        this.notificationService.showSnackBar(error.message);
      });
    }
  }

  back():void{
    this.router.navigate(['tasks']);
  }
}
