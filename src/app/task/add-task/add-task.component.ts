import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {PriorityService} from "../../service/priority.service";
import {Priority} from "../../models/Priority";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../models/Employee";
import {CategoryService} from "../../service/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {Task} from "../../models/Task";
import {Observable} from "rxjs";

// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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

  user: User;
  dateControl: Date;
  newTask: string;
  employees: Employee[];
  priorities: Priority[];
  task: Observable<Task>;

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
    this.dateControl=new Date();
    this.newTask="Новое мероприятие";
    this._createTaskFormBuilder();
  }

  ngOnInit(): void {
  }

  private _createTaskFormBuilder(){
    this._taskForm=this.fb.group({
      newTask: [this.newTask, Validators.required],
      employee: [this.employees, Validators.required],
      priority: [this.priorities, Validators.required],
      dateControl: [this.dateControl, Validators.required]
    })
  }

  submit():void {
    console.log(this._taskForm.value);

    this.taskService.createTask({
      title: this._taskForm.value.newTask,
      employeeId: this._taskForm.value.employee,
      priorityId: this._taskForm.value.priority,
      categoryId: 1,
      dateControl: this._taskForm.value.dateControl
    }).subscribe(data=>{
      console.log(data);
      this.notificationService.showSnackBar('Данные были успешно записаны');
      this.router.navigate(['tasks']);
      // window.location.reload();
    },error => {
      console.log(error.message);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
