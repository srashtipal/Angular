import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid;
  questions ;

  markGot : number = 0;
  correctAnswer : number = 0;
  attempted:number = 0;
  isSubmit: boolean =false;

  timer: any;

  constructor(
    private locationSt:LocationStrategy,
    private route : ActivatedRoute,
    private question : QuestionService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params.qid;
    this.loadQuestions();
  }

  loadQuestions(){
    this.question.getQuestionOfQuizForTest(this.qid).subscribe((data: any)=>{
      this.questions = data;
      this.timer= this.questions.length * 2 * 60;
      this.questions.forEach(element => {
        element['givenAnswer'] ='';
      });
      console.log(this.questions);
      this.startTimer();
    },(error)=>{
      Swal.fire('error !!','Error for loding question','error');
    })
  }

  preventBackButton(){
    history.pushState(null,null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    });
  }
  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit quiz?',
      showCancelButton: true,
      confirmButtonText: 'submit',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evilQuiz();
      }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer <= 0){
        this.evilQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTime(){
    let mm= Math.floor(this.timer/60);
    let ss= this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }

  evilQuiz(){
    this.isSubmit = true;
         this.questions.forEach(element => {
              if(element.givenAnswer == element.answer){
                this.correctAnswer++;
                let singleMark =  this.questions[0].quiz.maxMark/ this.questions.length;
                this.markGot +=singleMark;
              }
              if(element.givenAnswer.trim()!='')
              {
                this.attempted++;
              }
         });

         this.markGot = parseFloat(Number(this.markGot).toFixed(2));
         console.log(this.correctAnswer);
         console.log(this.markGot);
  }

  printPage(){
    window.print();
  }
}
