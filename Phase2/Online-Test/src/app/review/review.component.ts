import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  myQuestions: Observable<Question[]>;
  myAnswers: Array<string> = [];
  
  constructor(public qSer: QuestionService) {
    this.myQuestions = qSer.getQuestions();   //dynamically create the array of questions
  }

  ngOnInit(): void {
    this.myQuestions.subscribe(allQuestions => {
      for (let qq of allQuestions) {
        this.myAnswers.push(sessionStorage.getItem(qq.question) || "");
      }
    })
  }

}
