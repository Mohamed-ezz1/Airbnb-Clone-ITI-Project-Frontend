import { Component } from '@angular/core';
import{ AuthenticationService  }  from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Airbnb-Clone-ITI-Project-Frontend';
  private authenticationService: AuthenticationService
  constructor(authenticationService: AuthenticationService){
   this.authenticationService =authenticationService

  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);
    }}
}
