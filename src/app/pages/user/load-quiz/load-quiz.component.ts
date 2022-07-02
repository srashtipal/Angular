import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId :any ;
  quizData : any;
  constructor(
    private router : ActivatedRoute,
    private quiz : QuizService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.router.params.subscribe((param)=>{
      this.catId = param.catId;
      console.log(this.catId);
      if(this.catId == 0){
       this.quiz.getActiveQuizzes().subscribe((data)=>{
        this.quizData  = data;
       },
       (error) =>{
        this.snack.open('invalid credentials', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
       })
      }
      else{
        this.quizData = [];
        this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
          this.quizData = data;
        },
        (error)=>{
          this.snack.open('invalid credentials', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        })
      }
    })
  }

}
