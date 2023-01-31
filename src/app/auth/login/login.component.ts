import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private userService:UserService,
    private fb: FormBuilder) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }
  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  testHost(){
    this.authService.testHost();
  }

  submit(): void{
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password.toLowerCase()
    }).subscribe(data => {

      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.userService.getRolesCurrentUser();
      this.notificationService.showSnackBar('Успешно зашли на сайт');
      this.router.navigate(['main']);
    }, error => {
      this.notificationService.showSnackBar(error);
    });
  }
  inputHandler(event:any){
    const value=event.target.value;
    console.log(value)
  }

}
