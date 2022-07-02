import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzesData : any = [];

  constructor(private quizService : QuizService) { }

  ngOnInit(): void {
       this.quizService.quizzes().subscribe((data : any ) => {
         this.quizzesData = data;
         console.log(this.quizzesData);
       },(error)=>{
            console.log(error);
       })
  }

  deleteQuiz(qId){

    Swal.fire({
       icon:"warning",
       title:"Are you sure ?",
       confirmButtonText: "Delete",
       showCancelButton:true,
    }).then((result) => {
         if(result.isConfirmed){
           this.quizService.deleteQuizzes(qId).subscribe((data : any ) => {
             this.quizzesData = this.quizzesData.filter((quiz) => quiz.qid != qId);
             Swal.fire('Delete !!','Delete Success', "success");
           },(error)=>{
             Swal.fire('Error !!','Error for delete',  "success");
           })
         }
    });

  }

}
