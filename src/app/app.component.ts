<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/User/user.service';
=======
import { Component } from '@angular/core';
import{ AuthenticationService  }  from 'src/app/Services/User/user.service';
>>>>>>> 1417b050b7e6e0f34f4ac17025262d175b91d351

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Airbnb-Clone-ITI-Project-Frontend';
<<<<<<< HEAD
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);
    }
  }
=======
  private authenticationService: AuthenticationService
  constructor(authenticationService: AuthenticationService){
   this.authenticationService =authenticationService

  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);
    }}
>>>>>>> 1417b050b7e6e0f34f4ac17025262d175b91d351
}
