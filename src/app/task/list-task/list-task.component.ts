import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/Task";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {PriorityService} from "../../service/priority.service";
import {EmployeeService} from "../../service/employee.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  isTaskLoaded = false;
  isUserDataLoaded = false;
  isAdmin = false;
  public task:Task;
  tasks: Task[];
  user: User;
  action: string;
  deleteIdTask:number;
  indexTask:number;

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.taskService.listTask().subscribe(data => {
      console.log(data);
      this.tasks = data;
      this.taskService.listTask()
        .subscribe(data=>{
          console.log(data);
        });
      this.isTaskLoaded = true;
    });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })

  }

  getPriority(tasks: Task[]): void {
    tasks.forEach(task => {
      this.priorityService.getPriorityById(task.priorityId)
        .subscribe(data => {
          console.log(data);
          task.priority = data;
        })
    });
  }

  getInfoTask(tasks: Task[]): void {
    tasks.forEach(task => {
      this.priorityService.getPriorityById(task.priorityId)
        .subscribe(data => {
          console.log(data);
          task.priority = data;
        });
      this.employeeService.getEmployeeById(task.employeeId)
        .subscribe(data=>{
          console.log(data);
          task.employee=data;
        });
    });
  }

  // TODO реализовать отображение pdf
  /** метод реализующий возвращение формата картинки */
  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  setCurrentTask(index:number,id:number):void{
    console.log("Set task ID:"+id);
    this.task=this.tasks[index];
    this.taskService.setTask(this.task);
    this.router.navigate(['edit-task']);
  }

  editTask(index:number,id:number):void{
    console.log("Edit task ID:"+id);
    this.task=this.tasks[index];
    this.taskService.setCurrentTaskId(id);
    this.taskService.getTaskById(this.taskService.currentTaskId);
    this.router.navigate(['edit-task']);
  }

  openDialog(index:number, id:number): void {
    this.indexTask=index;
    this.deleteIdTask=id;
    console.log("Delete task ID:"+this.deleteIdTask.toString());
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {title: this.tasks[index].title, action: this.action},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action = result;
      if (this.action) {
        this.taskService.deleteTask(this.deleteIdTask)
          .subscribe(data=>{
            console.log(data);
            this.notificationService.showSnackBar('Данные были успешно удалены');
            window.location.reload();
          }), error=>{
          console.log(error.message);
          this.notificationService.showSnackBar(error.message);
        }
        console.log(this.tasks[index].title + 'was deleted');
      }
      else
        console.log('Task not delete');
    });
  }


}
