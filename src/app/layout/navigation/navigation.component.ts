import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  isDataLoaded = false;
  user: IUser;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit(): void {
    // проверка на то зашел ди пользователь на сайт если оставить "!" то происходит зацикливание
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }
  logout(): void {
    this.tokenService.logOut();
    // this.router.navigate(['/app-login']);
  }
}
