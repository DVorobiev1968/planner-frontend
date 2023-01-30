import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {IUser, User} from "../../models/User";
import {PriorityService} from "../../service/priority.service";
import {IPriority} from "../../models/Priority";
import {EmployeeService} from "../../service/employee.service";
import {IEmployee} from "../../models/IEmployee";
import {CategoryService} from "../../service/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  _taskForm: FormGroup;

  isUserDataLoaded = false;
  isEmployeesLoaded = false;
  isPriorityLoaded = false;
  isUsersLoaded = false;
  isAdmin = false;
  isUser = false;
  isRolesLoaded = false;

  user: IUser;
  dateControl: Date;
  newTask: string;
  reference: string;
  employees: IEmployee[];
  priorities: IPriority[];
  users: IUser[];
  note: string;

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private categoryService: CategoryService,
              private userService: UserService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private router: Router
              ) {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.employeeService.listEmployee()
      .subscribe(data =>{
        this.employees=data;
        this.isEmployeesLoaded=true;
      });

    this.priorityService.listPriority()
      .subscribe(data =>{
        this.priorities=data;
        this.isPriorityLoaded=true;
      });

    this.userService.getAll()
      .subscribe(data=>{
        this.users=data;
        this.isUsersLoaded=true;
      })
  }

  ngOnInit(): void {
    this.dateControl=new Date();
    this.newTask="Новое мероприятие";
    this.reference="Подробно о мероприятии";
    this.note="Пояснения"
    this._createTaskFormBuilder();
  }

  ngOmLoad(): void {
    this.userService.setUser(this.user);
    this.isAdmin = this.userService.isAdmin(this.user.roles);
    this.isUser = this.userService.isUser(this.user.roles);
    this.isRolesLoaded = true;
  }

  private _createTaskFormBuilder(){
    this._taskForm=this.fb.group({
      newTask: [this.newTask, Validators.required],
      reference: [this.reference, Validators.required],
      teamlied: [this.users],
      employee: [this.employees, Validators.required],
      priority: [this.priorities, Validators.required],
      dateControl: [this.dateControl, Validators.required],
      note: [this.note]
    })
  }

  submit():void {

    this.taskService.createTask({
      title: this._taskForm.value.newTask,
      reference:this._taskForm.value.reference,
      employeeId: this._taskForm.value.employee,
      priorityId: this._taskForm.value.priority,
      categoryId: 1,
      dateControl: this._taskForm.value.dateControl,
      note:this._taskForm.value.note
    }).subscribe(data=>{
      this.notificationService.showSnackBar('Данные были успешно записаны');
      this.router.navigate(['tasks']);
      // window.location.reload();
    },error => {
      this.notificationService.showSnackBar("Ошибка при добавлении мероприятия: "+error.message);
    });
  }

  submitExtend():void {

    this.taskService.createTaskExtend({
      title: this._taskForm.value.newTask,
      reference:this._taskForm.value.reference,
      employeeId: this._taskForm.value.employee,
      priorityId: this._taskForm.value.priority,
      categoryId: 1,
      dateControl: this._taskForm.value.dateControl,
      note:this.note,
      teamliedId:this._taskForm.value.teamlied
    }).subscribe(data=>{
      this.notificationService.showSnackBar('Данные были успешно записаны');
      this.router.navigate(['tasks']);
      // window.location.reload();
    },error => {
      this.notificationService.showSnackBar(error.message);
    });
  }

}
