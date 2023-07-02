import { Component,OnInit   ,ElementRef, ViewChild } from '@angular/core';
import{ AuthenticationService  }  from 'src/app/Services/User/user.service';
import{ SearchboxService  }  from 'src/app/Services/search/searchbox.service';
import { from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QueryService } from 'src/app/Services/query/query.service';

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

  //search output 

  selectedCountry:any ;
  selectedCity:any ;
numberOfguets:any;
cities:any;
  
constructor( a:AuthenticationService , SearchboxService :SearchboxService ,query : QueryService ){
this.authenticationService=a;
this.SearchboxService = SearchboxService;
this.query = query;
query.setqeury({"cityId": 0})
this.selectedCountry= null ;
this.selectedCity  = null;
this.numberOfguets=null;

} 
  ngOnInit(): void {
  this.authenticationService.isLoggedIn$.subscribe({
   
next: (value)=> {
  this.Isloggen=value
  console.log(this.Isloggen)
},
error: ()=> this.Isloggen=false
     })
 
 
 this.SearchboxService.Searchbarinformation().subscribe({
  next:(value) =>{ 

    this.searchCountryandcity=value
    console.log(this.searchCountryandcity)
    console.log(this.searchCountryandcity.countryId )
    this.searchCountryandcity.forEach((element:any) => {
     console.log( element.countryId)
    });

  
  },
  
 })


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



}
