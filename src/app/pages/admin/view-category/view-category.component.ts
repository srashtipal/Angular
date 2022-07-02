import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories = [
    {
      "title": "programming",
      "description":"programming quiz"
    },
    {
      "title": "java",
      "description":"java quiz"
    },
    {
      "title": "jk",
      "description":"jk quiz"
    }
  ]

  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
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

}
