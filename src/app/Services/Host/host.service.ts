import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private myClient: HttpClient) { }

  private readonly baseUrl = "https://localhost:7108/HostBooking"

  //HostBookingsDto
  // GetBookingByUserId(): Observable<HostBookingsDto[]> {
  //   return this.myClient.get(this.baseUrl);
  // }
}
