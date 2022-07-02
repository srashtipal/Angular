import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private httpClient : HttpClient
  ) { }

  //all question of quiz
  public getQuestionOfQuiz(qId){
    return this.httpClient.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  //question for test
  public getQuestionOfQuizForTest(qId){
    return this.httpClient.get(`${baseUrl}/question/quiz/${qId}`);
  }

  //add question
  public addQuestion(question){
    return this.httpClient.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(qid){
    return this.httpClient.delete(`${baseUrl}/question/${qid}`);
  }
}
