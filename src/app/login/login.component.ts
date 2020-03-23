import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  hasError = false;
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const loginData = this.loginForm.value;

    this.userService.login(loginData).subscribe((response) => {
      sessionStorage.setItem('login', response.login);
      sessionStorage.setItem('token', response.password);
      sessionStorage.setItem('userId', response.id);
      this.router.navigate(['games']);
    }, (error) => {
      this.hasError = true;
      this.errorMessage = 'Login or password incorrect!';
    });
  }

}
