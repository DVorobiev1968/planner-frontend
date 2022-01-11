import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {PriorityService} from "../../service/priority.service";
import {Priority} from "../../models/Priority";
import {EmployeeService} from "../../service/employee.service";
import {Employee} from "../../models/Employee";
import {CategoryService} from "../../service/category.service";
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  public  taskForm: FormGroup;

  isUserDataLoaded = false;
  isEmployeesLoaded = false;
  isPriorityLoaded = false;

  user: User;
  dateControl: Date;
  newTask: string;
  employees: Employee[];
  priorities: Priority[];

  private fb: FormBuilder

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private priorityService: PriorityService,
              private categoryService: CategoryService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
    this.dateControl=new Date();
    this.newTask="Новое мероприятие";

    this.employeeService.listEmployee()
      .subscribe(data =>{
        console.log(data);
        this.employees=data;
        this.isEmployeesLoaded=true;
      })

    this.priorityService.listPriority()
      .subscribe(data =>{
        console.log(data);
        this.priorities=data;
        this.isPriorityLoaded=true;
      })

  }
  createTaskForm():FormGroup {
    return this.fb.group({

    })
  }
}
