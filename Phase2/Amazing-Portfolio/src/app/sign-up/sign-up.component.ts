import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // @Output() signUpEvent = new EventEmitter<boolean>();

  @Output() addUserEvent = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  // sign up form reference 
  signupRef = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    password2: new FormControl("", [Validators.required]),
  });

  // checks if the two password fields match
  checkPassword(): boolean {
    return this.signupRef.value.password == this.signupRef.value.password2;
  }


  // can only register if all fields are filled out and passwords match
  // save signup info into session storage
  // save contact list info into session storage
  // hide signup component and show portfolio component
  registerUser() {
    console.log("registered");

    console.log("first name is: " + this.signupRef.value.firstName);
    let newUser: User = {
      firstname: this.signupRef.value.firstName,
      lastname: this.signupRef.value.lastName,
      username: this.signupRef.value.username,
      password: this.signupRef.value.password
    };
    
    this.addUserEvent.emit(newUser);  //send User object to app.component.html
    this.signupRef.reset();           //reset form
  }

}
