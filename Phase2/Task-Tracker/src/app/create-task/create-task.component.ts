import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from '../task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  //takes parent class's taskArray
  @Input() taskArray: Array<ITask> = [];

  displayeIdMsg: boolean = false;
  eIdMsg: string = "Employee ID must be a number. Try Again";
  constructor() { }

  ngOnInit(): void {
  }

  submitTask(taskRef:NgForm) {
    function isNum(input: string): boolean {
      if (!Number.isNaN(Number(input))) {
        return true;
      }
      return false;
    }

    if (isNum(taskRef.value.eID)) {
      this.displayeIdMsg = false;
      let newTask = { eID: taskRef.value.eID, name: taskRef.value.name, task: taskRef.value.task, deadline: taskRef.value.date };
      this.taskArray.push(newTask);
      taskRef.reset();
    } else {
      this.displayeIdMsg = true;
      taskRef.reset();
    }
  }

}
