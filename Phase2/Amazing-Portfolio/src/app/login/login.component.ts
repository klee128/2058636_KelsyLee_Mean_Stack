import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // get data from parent to child
  @Input() isFailLogin: boolean = false;

  // send data from child to parent
  @Output() signupEvent = new EventEmitter<boolean>();
  @Output() validateUserEvent = new EventEmitter<User>();

  // component properties
  errorMsg: string = "Incorrect username or password. Try again.";

  constructor() { }

  ngOnInit(): void {
  }

  loginRef = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  signup() {
    this.signupEvent.emit(true);
  }

  validateLogin() {
    let loginUser: User = {
      firstname: "",
      lastname: "",
      username: this.loginRef.value.username,
      password: this.loginRef.value.password,
    }
    this.validateUserEvent.emit(loginUser);
    this.loginRef.reset();
  }

}
