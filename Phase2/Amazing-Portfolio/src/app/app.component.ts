import { Component } from '@angular/core';
import { User } from './User.model';
import { Contact } from './Contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amazing-Portfolio';

  isSignUp: boolean = false;  //set to true
  isLogin: boolean = false;
  isPortfolio: boolean = false;  //set to false
  isDashboard: boolean = true;
  isFailedLogin: boolean = false;

  usersArray: Array<User> = [];
  contactsMap: Map<string, Array<Contact>> = new Map();
  // should set v to ""
  currentUserInfo: User = { firstname: "", lastname: "", username: "", password: "" };
  currentUserContactList: Array<Contact> = [];

  // given a User object from the sign-up component, push to usersArray.
  addUser(newUser: User) {
    console.log("in parent, username is ", newUser.firstname);
    this.usersArray.push(newUser);      //push new user to list of users
    console.log("usersArray is now size: " + this.usersArray.length);
    this.isSignUp = false;              //hide signup component
    this.isLogin = false;
    this.isPortfolio = true;            //show portfolio component
    this.currentUserInfo = newUser;
  }

  // given a Contact object form portfolio component, push to array in contactsMap
  addContact(newContact: Contact) {
    console.log("in parent: contact name is", newContact.contactName);
    // if already exists in map, append to already existing array of contacts
    if (this.contactsMap.has(this.currentUserInfo.username)) {
      console.log("contact already exists");
      this.contactsMap.get(this.currentUserInfo.username)?.push(newContact)
    } else {
      console.log("create a new contact");
      let contactArray = [newContact];
      this.contactsMap.set(this.currentUserInfo.username, contactArray);
    }
    //set currentUserContactList to the array of contacts associated with currentUser
    this.currentUserContactList = this.contactsMap.get(this.currentUserInfo.username) || [];
  }

  // given the login details, check if they exist in the 
  validateUser(loginUser: User):boolean {
    console.log("login info: " + loginUser.username + loginUser.password);

    // given a User, check if that User's username matches the username from Login
    function findUser(user: User) {
      return user.username == loginUser.username;
    }

    // if username is found in usersArray and passwords match
    // set currentuser to the login info and go to component
    if (this.usersArray.find(findUser) != undefined && this.usersArray.find(findUser)?.password == loginUser.password) {
      console.log("login izza match");
      this.currentUserInfo = this.usersArray.find(findUser) || { firstname: "", lastname: "", username: "", password: "" };
      this.isSignUp = false;
      this.isLogin = false;
      this.isPortfolio = true;
      return true;

    }
    // else, usernames or passwords don't match
    //reset form and give warning
    else {
      console.log("login fialed");
      this.isFailedLogin = true;
      return false;
    }


  }

  // given true (will always be given true), hide portfolio and show login page
  logout(bool: boolean) {
    this.currentUserInfo = { firstname: "", lastname: "", username: "", password: "" };
    this.currentUserContactList = [];
    this.isPortfolio = !bool;
    this.isSignUp = !bool;
    this.isLogin = !bool;
    this.isDashboard = bool;
  }

  login(bool: boolean) {
    this.isPortfolio = !bool;
    this.isSignUp = !bool;
    this.isLogin = bool;
    this.isDashboard = !bool;
  }

  // given true, hide portfolio and login. show signup
  signup(bool: boolean) {
    this.isPortfolio = !bool;
    this.isSignUp = bool;
    this.isLogin = !bool;
    this.isDashboard = !bool;
  }
}
