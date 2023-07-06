import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  tab$ = new BehaviorSubject<string>("/Property") 
  constructor() { }
}
