import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {CurrentTask, Task} from "../../models/Task";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {Employee} from "../../models/Employee";
import {Priority} from "../../models/Priority";
import {EmployeeService} from "../../service/employee.service";
import {PriorityService} from "../../service/priority.service";
import {CategoryService} from "../../service/category.service";

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

  user: User;
  taskId: number;
  currentTask: CurrentTask;
  task: Task;
  title: string;
  note: string;
  dateControl: Date;
  strDateControl: String;
  employees: Employee[];
  priorities: Priority[];

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private categoryService: CategoryService,
              private userService: UserService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private router: Router) {
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

    this.currentTask = this.taskService.getCurrentTask();
    this.taskService.getTaskById(this.currentTask.id)
      .subscribe(data => {
        this.task = data;
        this.isTaskDataLoaded = true;
        console.log(this.currentTask.id);
        console.log(this.task);
      }), error => {
      console.log(error.message);
      this.notificationService.showSnackBar(error.message);
      this.router.navigate(['tasks']);
    }

  }

  ngOnInit(): void {
    if (this.isTaskDataLoaded){
      this.title = this.task.title;
      this.note = this.task.note;
      this.dateControl = this.task.dateControl;
      this.strDateControl = this.task.strDateControl;
      this._editTaskFormBuilder();
    }
  }

  private _editTaskFormBuilder() {
    // console.log(this.currentTask);
    this._taskEditForm = this.fb.group({
      title: [this.title, Validators.required],
      employee: [this.employees, Validators.required],
      employeeId: [this.task.employeeId],
      priority: [this.priorities, Validators.required],
      priorityId: [this.task.priorityId],
      categoryId: 1,
      dateControl: [this.dateControl, Validators.required],
      strDateControl: [this.strDateControl],
      note: [this.note]
    })
  }

  submit(): void {
    console.log(this._taskEditForm.value);

    this.taskService.updateTask({
      title: this._taskEditForm.value.title,
      employeeId: this._taskEditForm.value.employee,
      priorityId: this._taskEditForm.value.priority,
      categoryId: this._taskEditForm.value.categoryId,
      dateControl: this._taskEditForm.value.dateControl,
      note: this._taskEditForm.value.note
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
