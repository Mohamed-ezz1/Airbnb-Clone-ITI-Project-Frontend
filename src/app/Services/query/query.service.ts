import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor( ) { }

  public query$ = new BehaviorSubject<any>(null);



  setqeury(query:any ){
    this.query$= query;
    }
}

