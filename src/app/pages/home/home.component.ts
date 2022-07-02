import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loginData = {
    username: '',
    password: '',
  };

  constructor( private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
    ) { }
  
  ngOnInit(): void {}
  submitLogin() {
    console.log('submitLogin');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('UserName is not empty', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('password is not empty', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
  //reqest to server to gennerate token
  this.login.generateToken(this.loginData).subscribe(
    (data:any)=>{
      console.log("success");
      console.log(data);
      //login... saving the token in local storage
      this.login.loginUser(data.token);
      //details of current user
        this.login.currentUser().subscribe((user: any) => {
          //saving user in local storage
          this.login.setUser(user);
          console.log(user);
          //redirect...Admin:admin-dashboard
          //redirect...Normal:normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            this.router.navigate(['admin']);
           this.login.loginStatusSubject.next(true);
           // window.location.href='/admin';
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal dashboard
            this.router.navigate(['user-dashboard']);
            this.login.loginStatusSubject.next(true);
            //window.location.href='/user-dashboard'
          } else {
            //if both not found logout or reload
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('invalid credentials', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
  );
}
}
