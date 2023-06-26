import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private myClient: HttpClient) { }
  private readonly guestBookingUrl = "https://localhost:7108/api/GuestsSection/GuestBooking"

  GetBookingByUserId() {
    return this.myClient.get(this.guestBookingUrl);
  }
}
