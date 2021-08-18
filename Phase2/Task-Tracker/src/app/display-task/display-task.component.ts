import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../task';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {

  @Input() taskArray: Array<ITask> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
