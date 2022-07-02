import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogin : Boolean =false;
  public User =null;

  constructor(
    public login : LoginService,
  ) { }

  ngOnInit(): void {
    this.isLogin =  this.login.isLoggedIn();
    this.User =  this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data =>{
    this.isLogin =  this.login.isLoggedIn();
    this.User =  this.login.getUser();
    })
  }

  logout(){
    this.login.logout();
    this.login.loginStatusSubject.next(false);
  }
}
