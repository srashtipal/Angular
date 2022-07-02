import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
   qId ;
   qTitle;
   question = [];
  constructor(
    private activeRoute : ActivatedRoute,
    private  questionService : QuestionService,
    private snack : MatSnackBar
  ) { }
  ngOnInit(): void {
   this.qId = this.activeRoute.snapshot.params.qid;
   this.qTitle = this.activeRoute.snapshot.params.title;
   this.questionService.getQuestionOfQuiz(this.qId).subscribe((data : any)=>{
    this.question = data;
    console.log(this.question);
   }
   ,(error) => {
      console.log(error);
   })
  }

     deleteQuestion(QueId: any){
      Swal.fire({
         icon:"warning",
         title:"Are you sure ?",
         confirmButtonText: "Delete",
         showCancelButton:true,
      }).then((result) => {
           if(result.isConfirmed){
            this.questionService.deleteQuestion(QueId).subscribe((data : any ) => {
               this.question = this.question.filter((que) => que.queid != QueId);
               Swal.fire('Delete !!','Delete Success', "success");
             },(error)=>{
               Swal.fire('Error !!','Error for delete',  "success");
             })
           }
      });

    }

}
