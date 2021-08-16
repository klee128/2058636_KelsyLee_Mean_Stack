import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Output() signUpEvent = new EventEmitter<boolean>();

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

    // let productArray = JSON.parse(sessionStorage.getItem('productArray') || "");
    

    this.signUpEvent.emit(false);     //send data to app.component.html to hide sign-up and display portfolio
    this.signupRef.reset();           //reset form
  }

}
