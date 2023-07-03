import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Airbnb-Clone-ITI-Project-Frontend';
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);
    }
  }
}
