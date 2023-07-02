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
constructor( a:AuthenticationService , SearchboxService :SearchboxService ,query : QueryService ){
this.authenticationService=a;
this.SearchboxService = SearchboxService;
this.query = query;
query.setqeury({"cityId": 1})
// console.log(query.GetQuery())


} 
  ngOnInit(): void {
  this.authenticationService.isLoggedIn$.subscribe({
   
next: (value)=> {
  this.Isloggen=true
  console.log(this.Isloggen)
},
error: ()=> this.Isloggen=false
     })
 
 
 this.SearchboxService.Searchbarinformation().subscribe({
  next:(value) =>{ 

    this.searchCountryandcity=value
    console.log(this.searchCountryandcity)

  
  },
  
 })


  }






}
