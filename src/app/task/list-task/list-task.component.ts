import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/Task";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {PriorityService} from "../../service/priority.service";
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  isTaskLoaded = false;
  isUserDataLoaded = false;
  tasks: Task[];
  user: User;

  constructor(private taskService: TaskService,
              private priorityService: PriorityService,
              private employeeService: EmployeeService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.taskService.listTask().subscribe(data => {
      console.log(data);
      this.tasks = data;
      this.getInfoTask(this.tasks);
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

}
