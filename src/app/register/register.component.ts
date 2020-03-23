import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage = '';
  hasError = false;
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const registerData = this.registerForm.value;
    if (this.validate(registerData)) {
      delete registerData.passwordRepeat;
      this.userService.register(registerData).subscribe((response) => {
        sessionStorage.setItem('login', response.login);
        sessionStorage.setItem('token', response.password);
        sessionStorage.setItem('userId', response.id);
        this.router.navigate(['games']);
      });
    }
  }

  validate(registerData) {
    if (registerData.password !== registerData.passwordRepeat) {
      this.hasError = true;
      this.errorMessage = 'Passwords doesn`t match!';
      return false;
    }
    return true;
  }
}
