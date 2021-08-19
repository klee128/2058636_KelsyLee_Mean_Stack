import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http: HttpClient) { }
  
  getQuestions():Observable<Question[]> {
    return this.http.get<Question[]>("/assets/quiz-questions.json");
  }
}
