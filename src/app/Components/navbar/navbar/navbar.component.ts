import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { SearchboxService } from 'src/app/Services/search/searchbox.service';
import { BehaviorSubject, distinctUntilChanged, from, map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QueryService } from 'src/app/Services/query/query.service';

import { AppRoutingModule } from "src/app/app-routing.module";
import { Route, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PropertyService } from 'src/app/Services/Property/property.service';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { NgModule } from '@angular/core';
import { Directive, Input } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

// import { MatMenuTrigger, _MatMenu } from '@angular/material'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {


  authenticationService: AuthenticationService;
  SearchboxService: SearchboxService
  Isloggen = true
  searchCountryandcity: any
  query: QueryService
  route: Router
  PropertyService: PropertyService
  UsertypeService: UsertypeService
  //search output
numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];


  selectedCountry: any;
  selectedCity: any;
  selectedCatogrey: any;
  ishost = "Guest";
  numberOfguets: any;
  cities: any;
  Catogires: any;
url:any
  constructor(a: AuthenticationService,
     SearchboxService: SearchboxService, 
     query: QueryService, route: Router,
      PropertyService: PropertyService,
       UsertypeService: UsertypeService,
        private hostService: HostService,
        private  ActivatedRoute:ActivatedRoute) 
         
         
         {
    this.authenticationService = a;

    this.SearchboxService = SearchboxService;
    this.query = query;
    this.selectedCountry = null;
    this.selectedCity = null;
    this.numberOfguets = null;
    this.route=route
    this.PropertyService = PropertyService
    this.UsertypeService = UsertypeService
    this.selectedCatogrey=null


  }

  ngOnDestroy(): void {
    console.log("onDestroy");
  }
  ngOnInit(): void {



  

    this.hostService.isHost$.subscribe((data: any) => {
      this.ishost = data;
    });
   
    this.authenticationService.isLoggedIn$.subscribe({

      next: (value) => {
        this.Isloggen = value;
        console.log(this.Isloggen)
      },
      error: () => this.Isloggen = false
    })

    this.SearchboxService.Searchbarinformation().subscribe({
      next: (value) => {

        this.searchCountryandcity = value
      },

    })

    this.PropertyService.Getallcatogrey().subscribe({
      next: (value) => this.Catogires = value

    })

  
  }






  getcities(a: any) {
    
if(a==0){
  this.cities=null
}else{
    
    this.selectedCountry = a
    console.log(this.selectedCountry)
    this.cities = this.searchCountryandcity.find((x: any) => x.countryId == +this.selectedCountry).navbarCities
    console.log(this.cities)
  }}
  changecity(a: any) {

    this.selectedCity = a;
    console.log(this.selectedCity)

  }

  logout() {


    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      this.authenticationService.isLoggedIn$.next(false);

      this.route.navigate(['/Property'])

console.log(this.route.url)
    }


  }


  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
  changeCatogrey(selected: any) {
    this.selectedCatogrey = selected
    console.log(this.selectedCatogrey)
  }

  x: any = {}
   search() {
    
    if (this.selectedCountry==0){
      this.selectedCountry=null

    }
    if (this.selectedCity==0){
      this.selectedCity=null

    }
    if (this.selectedCatogrey==0){
      this.selectedCatogrey=null

    }


     this.query.setqeury({ "cityId": this.selectedCity, "countryId": this.selectedCountry, "catogreyId": this.selectedCatogrey,"numberOfGuests":this.numberOfguets })
    this.route.navigateByUrl("/Property/filter")

  }

  changenumberofguests(numberofguest:any){
this.numberOfguets= numberofguest

  }
}
