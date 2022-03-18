import {Component, OnInit} from '@angular/core';
import {ITask} from "../../models/Task";
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {IUser, User} from "../../models/User";
import {PriorityService} from "../../service/priority.service";
import {EmployeeService} from "../../service/employee.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import * as XLSX from "xlsx";
import {DateService} from "../../service/date.service";
import {States} from "../../models/RouteTask";
import {Employee, IEmployee} from "../../models/IEmployee";
import {Category, ICategory} from "../../models/ICategory";
import {Priority} from "../../models/Priority";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  isTaskLoaded = false;
  isUserDataLoaded = false;
  isAdmin = false;
  isUser = false;
  isRolesLoaded = false;
  isEmployeesLoaded = false;
  isPriorityLoaded = false;
  isCategoryLoaded = false;
  isUsersLoaded = false;


  public task: ITask;
  tasks: ITask[];
  user: IUser;
  action: string;
  deleteIdTask: number;
  indexTask: number;
  fileNameExcel: string;
  states: States;
  employee: Employee;
  category: Category;
  categoryTitle: string;
  employees: IEmployee[];
  priorities: Priority[];
  categories: ICategory[];
  users: IUser[];
  teamlied: User;
  teamliederId: number;

  constructor(public dateService: DateService,
              private taskService: TaskService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private categoryService: CategoryService,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router,
              public dialog: MatDialog) {
    this.states = new States();
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
    // this.userService.setUser(this.user);
    // this.isAdmin=this.userService.isAdmin(this.user.roles);
    this.fileNameExcel = "Plan.xlsx";

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

    this.userService.getAll()
      .subscribe(data => {
        console.log(data);
        this.users = data;
        this.isUsersLoaded = true;
      })
    this.getCategory();
  }

  loadAllTask(): void {
    this.taskService.listTask()
      .subscribe(data => {
      console.log(data);
      this.tasks = data;
      this.isTaskLoaded = true;
    });

  }

  loadAllTaskByEmployee(): void {
    this.employee = new Employee(this.user.firstname, this.user.lastname);
    this.taskService.listTaskByEmployee(this.employee)
      .subscribe(data => {
        console.log(data);
        this.tasks = data;
        this.isTaskLoaded = true;
      },error => {
        this.isTaskLoaded=false;
      });
  }

  getCategory(): void {
    this.categoryService.listCategory()
      .subscribe(data => {
        console.log(data);
        this.categories = data;
        this.isCategoryLoaded = true;
      },error => {
        this.isCategoryLoaded=false;
      });

  }

  changeCategorySelect(event: any) {
    this.loadAllTaskByCategory();
  }

  changeUserSelect(event: any) {
    this.loadAllTaskByTeamlieder();
  }

  loadAllTaskByCategory(): void {
    this.category = new Category(this.categoryTitle);
    this.category.title = this.categoryTitle
    this.taskService.listTaskByCategory(this.category)
      .subscribe(data => {
        console.log(data);
        this.tasks = data;
        this.isTaskLoaded = true;
      }, error => {
        this.isTaskLoaded = false;
      });
  }

  loadAllTaskByTeamlieder(): void {
    this.teamlied = new User(this.teamliederId, "", "", "", "", "", "");
    this.taskService.listTaskByTeamlieder(this.teamlied)
      .subscribe(data => {
        console.log(data);
        this.tasks = data;
        this.isTaskLoaded = true;
      }, error => {
        this.isTaskLoaded = false;
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

  setCurrentTask(index: number, id: number): void {
    this.task = this.tasks[index];
    this.taskService.setTask(this.task);
    console.log("employee.FIO" + this.taskService.task.employee.fio);
    console.log("currentUser.FIO" + this.user.fio);
    if (this.user.fio == this.taskService.task.employee.fio ||
      this.user.fio == this.taskService.task.teamlieder ||
      this.userService.isAdmin(this.user.roles))
      this.router.navigate(['app-send-task']);
    else
      this.notificationService.showSnackBar("Направить на согласование может только Исполнитель задачи");
  }

  setCurrentDocs(index: number, id: number): void {
    console.log("Set task ID:" + id);
    this.task = this.tasks[index];
    this.taskService.setTask(this.task);
    console.log("employee.FIO" + this.taskService.task.employee.fio);
    console.log("teamlieder" + this.taskService.task.teamlieder);
    console.log("currentUser.FIO" + this.user.fio);
    if (this.user.fio == this.taskService.task.employee.fio ||
      this.user.fio == this.taskService.task.teamlieder ||
      this.userService.isAdmin(this.user.roles))
      this.router.navigate(['app-list-documents']);
    else
      this.notificationService.showSnackBar("Просматривать вложенные документы может только Исполнитель, или Руководитель задачи");
  }

  editTask(index: number, id: number): void {
    console.log("Edit task ID:" + id);
    this.task = this.tasks[index];
    this.taskService.setTask(this.task);
    this.router.navigate(['edit-task']);
  }

  openDialog(index: number, id: number): void {
    this.indexTask = index;
    this.deleteIdTask = id;
    console.log("Delete task ID:" + this.deleteIdTask.toString());
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {title: this.tasks[index].title, action: this.action},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action = result;
      if (this.action) {
        this.taskService.deleteTask(this.deleteIdTask)
          .subscribe(data => {
            console.log(data);
            this.notificationService.showSnackBar('Данные были успешно удалены');
            window.location.reload();
          }), error => {
          console.log(error.message);
          this.notificationService.showSnackBar(error.message);
        }
        console.log(this.tasks[index].title + 'was deleted');
      } else
        console.log('Task not delete');
    });
  }

  ngOmLoad(): void {
    this.userService.setUser(this.user);
    this.isAdmin = this.userService.isAdmin(this.user.roles);
    if (!this.isAdmin)
      this.notificationService.showSnackBar("У Вас отсутствует роль системного администратора");
    else
      this.notificationService.showSnackBar("Права системного администратора предоставлены");
    this.isUser = this.userService.isUser(this.user.roles);
    this.isRolesLoaded = true;
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('list-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'task');

    /* save to file */
    XLSX.writeFile(wb, this.fileNameExcel);
  }

  getState(id: number): string {
    let title = '';
    this.states.states.forEach(state => {
      if (state.id == id)
        title = state.title;
      return title;
    })
    return title;
  }

  setColor(day: number, date: any): any {
    var current = new Date();
    var control = new Date(date);
    var delta = control.getTime() - current.getTime();
    var deltaDay = Math.floor(delta / 1000 / 60 / 60 / 24);
    var color = (deltaDay > day) ? "black" : "red";
    // console.log("Alert:",color);
    return color;
  }
}
