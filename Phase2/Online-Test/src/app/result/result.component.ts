import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  myQuestions: Observable<Question[]>;
  myAnswers: Array<string> = [];
  
  constructor(public qSer: QuestionService) {
    this.myQuestions = qSer.getQuestions();
  }

  ngOnInit(): void {
    this.myQuestions.subscribe(allQuestions => {
      for (let qq of allQuestions) {
        this.myAnswers.push(sessionStorage.getItem(qq.question) || "");
      }
    })
  }

}
