import { Component } from '@angular/core';
import { ITask } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task-Tracker';

  taskArray: Array<ITask> = [];


}
