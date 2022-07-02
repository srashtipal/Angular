import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = {
    userName: null,
    password: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
  };

  constructor(
    private userService: UserService,
    private snack:MatSnackBar,
    private route : Router
    ) {}

  ngOnInit(): void {}

  formSubmit() {
    if(this.user.userName == '' || this.user.userName == null){
      this.snack.open("UserName is not empty" , '' , {
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data) => {
        Swal.fire(
          'Success',
          'User is Register',
          'success'
        ).then((e)=>{
        this.route.navigate(['/login'])});
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    );
  }
}
