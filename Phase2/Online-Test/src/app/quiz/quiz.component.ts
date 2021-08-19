import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionService } from '../question.service';
import { Question } from '../question';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  myForm: FormGroup;
  myQuestions: Observable<Question[]>;

  constructor(public qSer: QuestionService, public form: FormBuilder, private router:Router) {//DI for QuestionService and FormBuilder
    this.myForm = form.group({});              //dynamically create a form
    this.myQuestions = qSer.getQuestions();   //dynamically create an array of questions
  }   

  
  ngOnInit(): void {
    // on initialization, create a FormControl for each question in question array
    this.myQuestions.subscribe(allQuestions => {
      for (let qq of allQuestions) {
        this.myForm?.addControl(qq.question, this.form.control(""))
      }
    })
  }

  // on submitting quiz, send data and redirect to review 
  submitQ(): void {
    console.log("submit quiz");
    this.myQuestions.subscribe(allQuestions => {
      for (let qq of allQuestions) {
        console.log(this.myForm.value[qq.question]);
        sessionStorage.setItem(qq.question, this.myForm.value[qq.question]);
      }
    })

    this.router.navigate(['/review']);
  }

}
