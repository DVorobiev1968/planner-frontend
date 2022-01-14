import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {Employee} from "../../models/Employee";
import {Priority} from "../../models/Priority";
import {TaskService} from "../../service/task.service";
import {EmployeeService} from "../../service/employee.service";
import {PriorityService} from "../../service/priority.service";
import {CategoryService} from "../../service/category.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  _taskForm: FormGroup;

  isUserDataLoaded = false;
  isEmployeesLoaded = false;
  isPriorityLoaded = false;

  user: User;
  dateControl: Date;
  newTask: string;
  employees: Employee[];
  priorities: Priority[];
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
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.employeeService.listEmployee()
      .subscribe(data =>{
        console.log(data);
        this.employees=data;
        this.isEmployeesLoaded=true;
      });

    this.priorityService.listPriority()
      .subscribe(data =>{
        console.log(data);
        this.priorities=data;
        this.isPriorityLoaded=true;
      });
  }

  ngOnInit(): void {
    this.dateControl=new Date();
    this.newTask="Новое мероприятие";
    this.note="Пояснения"
    this._editTaskFormBuilder();
  }

  private _editTaskFormBuilder(){
    this._taskForm=this.fb.group({
      newTask: [this.newTask, Validators.required],
      employee: [this.employees, Validators.required],
      priority: [this.priorities, Validators.required],
      dateControl: [this.dateControl, Validators.required],
      note: [this.note]
    })
  }

  submit():void {
    console.log(this._taskForm.value);

    this.taskService.updateTask({
      title: this._taskForm.value.newTask,
      employeeId: this._taskForm.value.employee,
      priorityId: this._taskForm.value.priority,
      categoryId: 1,
      dateControl: this._taskForm.value.dateControl,
      note:this.note
    }).subscribe(data=>{
      console.log(data);
      this.notificationService.showSnackBar('Данные обновлены успешно');
      window.location.reload();
    },error => {
      console.log(error.message);
      this.notificationService.showSnackBar(error.message);
    });
  }


}
