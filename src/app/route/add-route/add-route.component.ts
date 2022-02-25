import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../models/User";
import {UserService} from "../../service/user.service";
import {State} from "../../models/RouteTask";
import {RouteService} from "../../service/route.service";
import {NotificationService} from "../../service/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TaskService} from "../../service/task.service";
import {DateService} from "../../service/date.service";

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})

export class AddRouteComponent implements OnInit {
  user:IUser;
  isUserDataLoaded = false;
  isAdmin = false;
  isUser = false;
  isRolesLoaded = false;

  startUsers: IUser[];
  destUsers: IUser[];
  isUsersDataLoaded: boolean;
  routeForm: FormGroup;
  states: Array<State>;

  constructor(private userService: UserService,
              public dateService: DateService,
              private routeService: RouteService,
              private taskService: TaskService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private router: Router) {
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
    this.states = [
      {"id": 0, "title": "В процессе"},
      {"id": 1, "title": "Направить на согласование"},
      {"id": 3, "title": "Отклонить"},
      {"id": 4, "title": "Согласовано"},
      {"id": 5, "title": "Снять с контроля"},
      {"id": 6, "title": "Завершить"}
    ];
  }

  ngOnInit(): void {
    this._createFormBuilder();
  }

  ngOmLoad(): void {
    this.user=this.userService.getUser();
    this.isAdmin = this.userService.isAdmin(this.user.roles);
    this.isUser = this.userService.isUser(this.user.roles);
    this.isRolesLoaded = true;
  }

  private _createFormBuilder(): FormGroup {
    this.ngOmLoad();
    return this.routeForm = this.fb.group({
      start: [this.startUsers, Validators.required],
      destination: [this.destUsers, Validators.required],
      state: [this.states, Validators.required],
      note: [this.routeService.routeTask.note]
    })
  }

  agreement(): void {
    this.routeService.createRouteTask({
      taskId: this.taskService.task.id,
      startId: this.routeForm.value.start,
      destinationId: this.routeForm.value.destination,
      note: this.routeForm.value.note,
      state: this.routeForm.value.state
    }).subscribe(data => {
      const errMessage = ("Задаче установлен признак: " + this.states[this.routeForm.value.state].title);
      this.notificationService.showSnackBar(errMessage);
      this.router.navigate(['tasks']);
    }, error => {
      console.log(error.message);
      this.notificationService.showSnackBar(error.message);
    });
  }

  inputHandler(event:any){
    // var currentDate=new Date();
    var currentDate=this.dateService.date.getValue().format("DD.MM.YYYY");

    const noteReact="Задача сформирована: "+currentDate+", статус: "+this.getState(this.routeForm.value.state);
    this.routeService.routeTask.note=noteReact;
    this.routeForm.value.note=noteReact;
  }
  getState(id:number):string{
    return this.states[id].title;
  }
}