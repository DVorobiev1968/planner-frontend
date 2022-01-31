import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {State} from "../../models/RouteTask";
import {RouteService} from "../../service/route.service";
import {NotificationService} from "../../service/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TaskService} from "../../service/task.service";

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})

export class AddRouteComponent implements OnInit {
  startUsers: User[];
  destUsers: User[];
  isUsersDataLoaded: boolean;
  routeForm: FormGroup;
  states: Array<State>;

  constructor(private userService: UserService,
              private routeService: RouteService,
              private taskService: TaskService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private router: Router
  ) {
    this.userService.getAll()
      .subscribe(data => {
        console.log(data);
        this.startUsers = data;
        this.destUsers = this.startUsers.slice();
        this.isUsersDataLoaded = true;
      }), error => {
      this.isUsersDataLoaded = false;
      this.startUsers = null;
      this.destUsers = null;
    };
    this.states=[
      {"id":0,"title":"В процессе"},
      {"id":1,"title":"Направить на согласование"},
      {"id":3,"title":"Отклонить"},
      {"id":4,"title":"Согласовано"},
      {"id":5,"title":"Снять с контроля"},
      {"id":6,"title":"Завершить"}
    ]
  }

  ngOnInit(): void {
    this._createFormBuilder();
  }

  private _createFormBuilder(): FormGroup {
    return this.routeForm = this.fb.group({
      start: [this.startUsers, Validators.required],
      destination: [this.destUsers, Validators.required],
      note: [this.routeService.routeTask.note],
      state: [this.states, Validators.required],
      taskId: [this.taskService.task.id]
    })
  }

  agreement(): void {
    this.routeService.createRouteTask({
      taskId: this.routeForm.value.taskId,
      startId: this.routeForm.value.start,
      destinationId: this.routeForm.value.destination,
      note: this.routeForm.value.note,
      state: this.routeForm.value.state
    }).subscribe(data => {
      console.log(data);
      // TODO вычислить ноиманование и вписать
      this.notificationService.showSnackBar("Данные направлены на:...");
    }, error => {
      console.log(error.message);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
