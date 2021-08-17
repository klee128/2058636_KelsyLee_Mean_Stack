import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() signupEvent = new EventEmitter<boolean>();
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  signup() {
    this.signupEvent.emit(true);
  }
  login() {
    this.loginEvent.emit(true);
  }

}
