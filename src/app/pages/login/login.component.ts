import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

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

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.login.loginUser(data.token);
        this.login.currentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          if (this.login.getUserRole() == 'ADMIN') {
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
          } else {
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
