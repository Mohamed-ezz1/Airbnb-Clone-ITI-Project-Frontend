import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  totalPrice: any;              //total price of booking 
  numOfNights: any;             //number of nights the user reserving 
  numOfGuests: any = 2;         // number of guests the user reserving
  startDate: any;               //start date of reservation
  endDate: any;
  userId: any;
  
  constructor() { }
}
