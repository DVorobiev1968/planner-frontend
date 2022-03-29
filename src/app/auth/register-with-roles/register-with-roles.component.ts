import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../models/ERole";
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-register-with-roles',
  templateUrl: './register-with-roles.component.html',
  styleUrls: ['./register-with-roles.component.css']
})
export class RegisterWithRolesComponent implements OnInit {
  public  registerForm:FormGroup;
  roles:Role

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.roles=new Role();
  }

  ngOnInit(): void {
    this.registerForm=this.createRegisterForm();
  }
  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      patronymic: ['', Validators.compose([Validators.required])],
      initial: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      roles:[this.roles.roles,Validators.compose([Validators.required])]
    });
  }

  setRoles(){
    this.registerForm.value.roles.forEach(item=>{
      this.setRole(item);
    })
  }
  setRole(index:number){
    // this.roles.roles[index].active=!this.roles.roles[index].active;
    this.roles.roles[index].active=true;
  }

  submit(): void {
    this.setRoles();

    this.authService.registerWithRoles({
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      patronymic:this.registerForm.value.patronymic,
      initial:this.registerForm.value.initial,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      roles:this.roles.roles
    }).subscribe(data => {
      this.notificationService.showSnackBar('Регистрация прошла успешно!');
    }, error => {
      this.notificationService.showSnackBar('Что-то пошло не так при регистрации');
    });
  }
}
