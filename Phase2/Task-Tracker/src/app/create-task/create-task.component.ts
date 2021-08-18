import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from '../task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @Input() taskArray: Array<ITask> = [];

  // @Input() taskArray: 
  constructor() { }

  ngOnInit(): void {
  }

  submitTask(taskRef:NgForm) {
    console.log(taskRef.value.eID + "" + taskRef.value.name + "" + taskRef.value.task + " " + taskRef.value.date);
    let newTask = { eID: taskRef.value.eID, name: taskRef.value.name, task: taskRef.value.task, deadline: taskRef.value.date };
    this.taskArray.push(newTask);
    taskRef.reset();
    console.log(this.taskArray.length);
  }

}
