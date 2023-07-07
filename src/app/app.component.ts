import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/User/user.service';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { TabsService } from './Services/tabs/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Airbnb-Clone-ITI-Project-Frontend';


  private authenticationService: AuthenticationService
  constructor(authenticationService: AuthenticationService,  private ActivatedRoute :ActivatedRoute ,private TabsService:TabsService){
   this.authenticationService =authenticationService

  }
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);

     
    }}
}
