import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor( ) { 
  }

  public query = new  BehaviorSubject<any>(!null);
  public query$ = this.query.asObservable(); //Has a $ 

  setqeury(query:any ){
    this.query= query;
    }


    
    GetQuery(){
     
      return this.query;
    }
}

