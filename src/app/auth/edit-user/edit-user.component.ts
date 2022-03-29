import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../models/ERole";
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public  registerForm:FormGroup;
  roles:Role
  selectItems:string[];

  constructor(
    private authService: AuthService,
    private userService:UserService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.roles=new Role();
  }

  ngOnInit(): void {
    this.registerForm=this.createRegisterForm();
  }
  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: [this.userService.user.email, Validators.compose([Validators.required, Validators.email])],
      username: [this.userService.user.username, Validators.compose([Validators.required])],
      firstname: [this.userService.user.firstname, Validators.compose([Validators.required])],
      lastname: [this.userService.user.lastname, Validators.compose([Validators.required])],
      patronymic: [this.userService.user.patronymic, Validators.compose([Validators.required])],
      initial: [this.userService.user.initial, Validators.compose([Validators.required])],
      roles:[this.roles.roles]
    });
  }

  setRoles(){
    this.registerForm.value.roles.forEach(item=>{
      this.setRole(item);
    })
  }
  setRole(index:number){
    this.roles.roles[index].active=true;
  }

  submit(): void {
    this.setRoles();

    this.authService.updateUser({
      id:this.userService.user.id,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      patronymic:this.registerForm.value.patronymic,
      initial:this.registerForm.value.initial,
      roles:this.roles.roles
    }).subscribe(data => {
      this.notificationService.showSnackBar(data.message);
    }, error => {
      this.notificationService.showSnackBar('Что-то пошло не так при регистрации'+error.message);
    });
    this.router.navigate(['app-list-users']);
  }
}
