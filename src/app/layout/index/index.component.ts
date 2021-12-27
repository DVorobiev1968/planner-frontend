import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/Task";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isTaskLoaded = false;
  isUserDataLoaded=false;
  tasks: Task[];
  user: User;

  constructor(private taskService: TaskService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.taskService.listTask().subscribe(data => {
      console.log(data);
      this.tasks = data;
      this.isTaskLoaded = true;
    });

    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
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
