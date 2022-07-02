import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  public categoryData: any = {
    title: '',
    description: '',
  };
  public isDataNotEmpty: Boolean = true;

  constructor(
    private category: CategoryService,
    private snack : MatSnackBar
    ) {}

  ngOnInit(): void {
  }

  //submit form calling action in html
  formSubmit(){
    if(this.categoryData.title.trim() =='' ||this.categoryData.title ==null)
     {
      this.snack.open('title required', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
     }

     //after adding categories sucessfull message displayed
     this.category.addCategories(this.categoryData).subscribe((data)=>{
      this.categoryData.title='';
      this.categoryData.description='';
        Swal.fire(
          'Success',
          'Category is added SuccessFully',
          'success'
        )
     },

     //error message displayed if not work proper
     (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
     })
  }
}
