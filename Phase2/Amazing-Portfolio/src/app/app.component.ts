import { Component} from '@angular/core';
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
  isPortfolio: boolean = true;  //set to false

  usersArray: Array<User> = [];
  contactsMap: Map<string, Array<Contact> > = new Map();
  // should set v to ""
  currentUserInfo: User = { firstname: "Kelsy", lastname: "Lee", username: "klee", password: "klee" };
  currentUserContactList: Array<Contact> = [];

  // given a User object from the sign-up component, push to usersArray.
  addUser(newUser: User) {
    console.log("in parent, username is ", newUser.firstname);
    this.usersArray.push(newUser);      //push new user to list of users
    console.log("usersArray is now size: " + this.usersArray.length);
    this.isSignUp = false;              //hide signup component
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
  
  // given true (will always be given true), hide portfolio and show login page
  logout(bool: boolean) {
    this.isPortfolio = !bool;
    this.isLogin = bool;
  }
}
