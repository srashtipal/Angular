import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId : any;
  quizData : any;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private quizService : QuizService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.qid;
    this.quizService.getQuiz(this.qId).subscribe((data)=>{
     this.quizData = data;
    },
    (error)=>{
      this.snack.open('invalid Quiz Id', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    })
  }

  StartQuiz(){
    Swal.fire({
      title: 'Do you want to start quiz?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.qId])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
