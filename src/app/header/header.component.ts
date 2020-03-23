import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(){
    if (sessionStorage.getItem('login') && sessionStorage.getItem('token')) {
      const tokenData = {
        login: sessionStorage.getItem('login'),
        password: sessionStorage.getItem('token')
      };
      this.userService.checkToken(tokenData).subscribe((response) => {
        this.logged = true;
      }, (error) => {
        sessionStorage.clear();
        this.logged = false;
      });
    }

  }

}
