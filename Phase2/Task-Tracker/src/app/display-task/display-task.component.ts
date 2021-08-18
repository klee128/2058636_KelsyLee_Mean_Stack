import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../task';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {

  @Input() taskArray: Array<ITask> = [];
  displayedColumns: Array<string> = ["Employee ID", "Name", "Task", "Deadline"];
  constructor() { }

  ngOnInit(): void {
  }

  random() {
    console.log("array size is " + this.taskArray.length);
    for (let task of this.taskArray) {
      console.log("task is " + task.task);
    }
  }

}
