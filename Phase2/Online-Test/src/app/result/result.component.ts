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
  numCorrect: number = 0;
  
  constructor(public qSer: QuestionService) {
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
    console.log("submitted " + submitA + " correct is " + correctA);
    if (submitA != correctA) {
      console.log('incorrect');
      return false;
    }
    this.numCorrect += 1;
    console.log("correct");
    return true;
  }

}
