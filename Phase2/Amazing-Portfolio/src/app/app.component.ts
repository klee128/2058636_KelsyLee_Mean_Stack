import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amazing-Portfolio';

  isSignUp: boolean = true;
  isLogin: boolean = false;
  isPortfolio: boolean = false;

  submitSignUp(hide: boolean) {
    this.isSignUp = hide;
    this.isPortfolio = !hide;
  }

  

  // toggleLogin() {
  //   this.isSignUp = !this.isSignUp;
  //   console.log("clicked button");
  // }
  
  // togglePortfolio() {
  //   this.isSignUp = !this.isSignUp;
  //   console.log("clicked button");
  // }

  
}
