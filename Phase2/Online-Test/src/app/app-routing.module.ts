import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: "quiz", component: QuizComponent },
  { path: "result", component: ResultComponent },
  { path: "review", component: ReviewComponent },
  // { path: "", component: QuizComponent }
  
  
  { path: "", redirectTo: "quiz", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
