import { Component,OnInit   ,ElementRef, ViewChild } from '@angular/core';
import{ AuthenticationService  }  from 'src/app/Services/User/user.service';
import{ SearchboxService  }  from 'src/app/Services/search/searchbox.service';
import { from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QueryService } from 'src/app/Services/query/query.service';

import { AppRoutingModule } from "src/app/app-routing.module";
import { Route, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import{PropertyService} from 'src/app/Services/Property/property.service';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { NgModule } from '@angular/core';
import { Directive, Input } from '@angular/core';
// import { MatMenuTrigger, _MatMenu } from '@angular/material'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit   {


  authenticationService : AuthenticationService ;
  SearchboxService:SearchboxService
  Isloggen= true
  searchCountryandcity:any
  query :QueryService
route: Router
PropertyService:PropertyService
UsertypeService:UsertypeService
  //search output 

  selectedCountry:any ;
  selectedCity:any ;
  selectedCatogrey:any ;
  ishost:any

numberOfguets:any;
cities:any;
Catogires :any;  
constructor    ( a:AuthenticationService , SearchboxService :SearchboxService ,query : QueryService ,route: Router  , PropertyService:PropertyService,UsertypeService:UsertypeService){
this.authenticationService=a;
this.SearchboxService = SearchboxService;
this.query = query;
query.setqeury({"cityId": 1})
query.setqeury({"catogreyId": 1  ,"cityId": 1 })
query.setqeury({"catogreyId": 1  ,"cityId": 11 })
this.route=route
this.selectedCountry= null ;
this.selectedCity  = null;
this.numberOfguets=null;
this.PropertyService=PropertyService
this.UsertypeService=UsertypeService

} 
  ngOnInit(): void {
  this.authenticationService.isLoggedIn$.subscribe({
   
next: (value)=> {
  this.Isloggen=value;
  console.log(this.Isloggen)
},
error: ()=> this.Isloggen=false
     })
 
 
 this.SearchboxService.Searchbarinformation().subscribe({
  next:(value) =>{ 

    this.searchCountryandcity=value
  },
  
 })

 this.PropertyService.Getallcatogrey().subscribe({
  next: (value)=> this.Catogires=value
  
 })

this.UsertypeService.getusertype().subscribe({
  next:(value:any) =>{
     if (value.userType=="Guest"){
      console.log(value.userType)
      this.ishost=false

      this.ishost=false
     }else  if (value.userType=="Host"){
      console.log(value.userType)
      this.ishost=true
     }

  },
  error : ()=>{

    console.log("not found user ")
  }}
  )
  
}
 





getcities( a:any){
  this.selectedCountry =a 
  console.log(this.selectedCountry)
  this.cities=this.searchCountryandcity.find((x:any) =>x.countryId==+this.selectedCountry).navbarCities
  console.log(this.cities)
}
changecity(a :any){

this.selectedCity =a ;
console.log(this.selectedCity)

}

 logout(){
 

       if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
          this.authenticationService.isLoggedIn$.next(false);

         this.route.navigate(['/Property'])


  }
  

}


redirectTo(uri: string) {
  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.route.navigate([uri]));
}
changeCatogrey(selected:any){
  this.selectedCatogrey = selected
}

 x:any ={}
 async search(){
//.x["cityId"]=this.selectedCity;
//this.x["countryId"]= this.selectedCountry
//this.x["catogreyId"]=this.selectedCatogrey
//this.x["numberOfguets"]=5;
//console.log(this.x);
await this.query.setqeury({"cityId":this.selectedCity,"countryId":this.selectedCountry,"catogreyId":this.selectedCatogrey,})
this.redirectTo("/Property")

}
}
