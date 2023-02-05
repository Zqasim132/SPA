import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe(isAuthorized =>{
      debugger
      if(isAuthorized){
        this.router.navigate(['callback']);
      }
    })
  }

  // user() {
  //   return this.authService.getUser();
  // }

  // onLogOff() {
  //   this.authService.logOut();
  // }

  // isAuthenticated() {
  //   debugger
  //   console.log(this.authService.isAuthenticated)
  //   return this.authService.isAuthenticated;
  // }

  login() {
    this.authService.login();
  }

}
