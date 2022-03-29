import {Component, OnInit, ViewChild} from '@angular/core';
import {PriorityService} from "../../service/priority.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IUser} from "../../models/User";
import {IPriority, Priority} from "../../models/Priority";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-list-priority',
  templateUrl: './list-priority.component.html',
  styleUrls: ['./list-priority.component.css']
})
export class ListPriorityComponent implements OnInit {
  isUserDataLoaded = false;
  isPriorityLoaded = false;
  isAdmin = false;
  displayedColumns: string[] = ['title', 'countDay'];
  dataSource: Array<Priority>;
  isDataSourceLoaded = false;
  itemDataSource: Priority;
  public _priorityForm: FormGroup;
  updateAction = false;
  addAction = false;

  @ViewChild(MatTable) table: MatTable<IPriority>;

  user: IUser;
  priorities: IPriority[];

  title: String;
  countDay: number;

  constructor(
    private priorityService: PriorityService,
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router) {

    this.title = "";
    this.countDay = 0;
    this.dataSource = new Array<Priority>();

  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.userService.setUser(this.user);
        this.isAdmin = this.userService.isAdmin(this.user.roles);
        this.isUserDataLoaded = true;
      });
    this.viewPriorities();
    this._createForm();
  }

  _createForm(): FormGroup {
    return this._priorityForm = this.fb.group({
      title: [this.title, Validators.required],
      countDay: [this.countDay]
    });
  }

  viewPriorities(): void {
    this.priorityService.listPriority()
      .subscribe(data => {
        data.forEach(item => {
          this.itemDataSource = new Priority(item);
          this.dataSource.push(this.itemDataSource);
        });
        this.priorities = data;
        this.isPriorityLoaded = true;
      });

  }

  deletePriority(index: number): void {
    console.log(index);
  }

  updatePriority(index: number): void {
    console.log(this.priorities[index]);
    this.addAction = false;
    this.updateAction = true;
  }

  submitUpdate(): void {
    console.log("submitUpdate()", this._priorityForm.value)
  }

  submitAdd(): void {
    console.log("submitAdd()", this._priorityForm.value)
  }

  addPriority(): void {
    console.log("addPriority()");
    this.addAction = true;
    this.updateAction = false;
  }

  viewPriority(row: any): void {
    console.log(row);
    this.title = row.title;
    this.countDay = row.countDay;
    this._priorityForm.value.title=this.title;
    this._priorityForm.value.countDay=this.countDay;
  }

}
