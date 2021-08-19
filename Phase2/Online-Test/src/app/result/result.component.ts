import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  numCorrect: number = 0;
  
  constructor(public qSer: QuestionService, private router: Router) {
    this.myQuestions = qSer.getQuestions();
  }

  ngOnInit(): void {
    this.myQuestions.subscribe(allQuestions => {
      for (let qq of allQuestions) {
        let ans = sessionStorage.getItem(qq.question) || "";
        this.myAnswers.push(ans);
        this.checkAnswer(ans, qq.correctAns);
      }
    })
  }

  checkAnswer(submitA: string, correctA: string): boolean{
    if (submitA != correctA) {
      return false;
    }
    this.numCorrect += 1;
    return true;
  }

  gotoQuiz() {
    this.router.navigate(['/quiz']);
  }
}
