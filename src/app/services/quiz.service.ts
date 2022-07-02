import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http :  HttpClient) { }

    //fetch quizes
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

    //add quiz function
  public addQuizzes(quizData :any){
    return this.http.post(`${baseUrl}/quiz/`,quizData);
  }

  //delete quiz 
  public deleteQuizzes(quizId :any){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  //update quiz
  public UpdateQuizzes(quizData :any){
    return this.http.put(`${baseUrl}/quiz/`, quizData);
  }

    //single quiz
  public getQuiz(quizId){
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }

  //quiz category
  public getQuizzesOfCategory(cId){
    return this.http.get(`${baseUrl}/quiz/category/${cId}`);
  }

  //active quiz
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active/`);
  }

  //active quiz category
  public getActiveQuizzesOfCategory(cId){
    return this.http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
