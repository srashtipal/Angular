import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  public categories = [
    {
      "cid":1,
      "title":"cat1"
    }, {
      "cid":2,
      "title":"cat2"
    }
  ];

  //quiz description filed called in html file
  quizData = {
    title:'',
    description : '',
    maxMark : '',
    numberOfQuetion : '',
    active:true,
    category: {
      cid:''
    },

  };

  constructor(
    private categoryService : CategoryService,
    private quizService : QuizService) { }

  ngOnInit(): void {
    console.log(this.quizData);
    this.categoryService.categories().subscribe((data : any)=>{
      this.categories= data;
      console.log(this.categories);

},
//error 
(error ) => {
  console.log(error);
  Swal.fire('error !!','Error in loding data','error');
})
  }

  //action button
  submitQuizData(){
    this.quizService.addQuizzes(this.quizData).subscribe((data : any)=>{
      Swal.fire('Success !!',data.title, data.title);
      this.quizData ={
        title:'',
        description : '',
        maxMark : '',
        numberOfQuetion : '',
        active:true,
        category: {
          cid:''
        },

      }

},
(error ) => {
  console.log(error);
  //Swal.fire('error !!','Error in loding data','error');
})
  }


}
