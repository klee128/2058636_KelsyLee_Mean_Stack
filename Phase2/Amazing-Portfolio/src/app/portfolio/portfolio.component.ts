import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User.model';
import { Contact } from '../Contact.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  // get user info from parent (currentUserInfo)
  @Input() userInfo: User = { firstname: "", lastname: "", username: "", password: "" };
  @Input() contactList: Array<Contact> = [];
  //send this info to parent
  @Output() addContactEvent = new EventEmitter<Contact>();
  @Output() logoutEvent = new EventEmitter<boolean>();

  isDisplayContacts: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  newContactRef = new FormGroup({
    contactName : new FormControl("", [Validators.required]),
    phoneNumber : new FormControl("", [Validators.required]),
  });

  addContact() {
    console.log("add contact" + this.newContactRef.value.contactName + this.newContactRef.value.phoneNumber);
    // if (typeof this.newContactRef.value.contactName == "string" && typeof parseInt(this.newContactRef.value.phoneNumber)=="number") {
    //   console.log("all the right types");
    // } else {
    //   console.log("wrong type");
    // }
    let newContact: Contact = {
      contactName: this.newContactRef.value.contactName,
      phoneNumber: this.newContactRef.value.phoneNumber
    };

    this.addContactEvent.emit(newContact);
    this.newContactRef.reset();
  }

  toggleDisplayContacts() {
    this.isDisplayContacts = !this.isDisplayContacts;
  }

  logout() {
    this.logoutEvent.emit(true);
  }
}
