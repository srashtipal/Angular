import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qid;
  qtitle;
  question = {
    quiz :{

    },
    content :'',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer :'' ,

  };

  constructor(
   private router : ActivatedRoute,
   private questionService : QuestionService
  ) { }

  ngOnInit(): void {
    this.qid =  this.router.snapshot.params.qid;
    this.qtitle =  this.router.snapshot.params.title;
    this.question.quiz['qid'] = this.qid;
    console.log(this.qid);
  }

  //action button for form submit
  addQuestion()
  {
    if(this.question.content.trim() == '' || this.question.content==null){
      return;
    }
    console.log(this.question);

    //successful message displayed
    this.questionService.addQuestion(this.question).subscribe((data) => {
      Swal.fire('Success !!','Question Added', 'success');
      this.question.answer='';
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
    },

    //error message displayed
    (error)=>{
      Swal.fire('error !!','Error in add question','error');
    })
  }

}
