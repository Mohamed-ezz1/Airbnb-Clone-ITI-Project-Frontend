import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GtegoryDto } from 'src/app/types/Gategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private myClient: HttpClient) { }



  public queryforcategory = new  BehaviorSubject<any>(null!);
  public query$ = this.queryforcategory.asObservable(); //Has a $

  setqeury(query:any ){

    console.log(query)
    this.queryforcategory= query;
    }




  GetAllGategory(): Observable<any> {

    return this.myClient.get('https://localhost:7108/api/Home/Categories')
  }

}
