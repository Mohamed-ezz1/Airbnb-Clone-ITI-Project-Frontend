import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QueryService {
   count : any =0
  constructor( ) { 
  }

  public query = new  BehaviorSubject<any>(!null);
  public query$ = this.query.asObservable(); //Has a $ 

  setqeury(query:any ){
    this.count++;
    console.log(this.count + " " + query)
    this.query= query;
    }




    GetQuery(){
      console.log(this.query$)
      return this.query;
    }
    
}






