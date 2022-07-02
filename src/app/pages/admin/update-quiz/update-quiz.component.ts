import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid = 0;
  public quizData : any;
  public categories : any;

  constructor(
    private quizService : QuizService,
    private route: ActivatedRoute,
    private categoryService : CategoryService,
    private snack :  MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
     this.qid = this.route.snapshot.params.qid;
     this.quizService.getQuiz( this.qid).subscribe((data : any)=> {
      this.quizData = data;
      console.log(this.quizData);
     },

     //error
     (error) => {
      Swal.fire('Error !!','Error for delete',  "error");
     }
     )

     this.categoryService.categories().subscribe((data)=>{
      this.categories = data;
     },

     //error
     (error) => {
      this.snack.open('invalid Data', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
     })
  }

  //action button
  submitData(){
    this.quizService.UpdateQuizzes(this.quizData).subscribe((data)=>{
      Swal.fire('Success !!',"","success").then((e)=>{
        this.router.navigate(['/admin/quizzes']);
      });
    },

    //error
    (error)=>{
      Swal.fire('error !!','Error in loding data','error');
    })
  }

}
