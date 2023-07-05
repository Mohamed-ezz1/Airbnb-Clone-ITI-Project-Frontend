import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private myClient: HttpClient) { }
  private readonly guestBookingUrl = "https://localhost:7108/api/GuestsSection/GuestBooking"
  private readonly guestDeleteBooking = "https://localhost:7108/api/GuestsSection";

  GetBookingByUserId() {
    return this.myClient.get(this.guestBookingUrl);
  }

  deleteByBookingId(bookingId: string) {
    if (confirm('Are you sure you want to delete this Booking')) {
      return this.myClient.delete(`${this.guestDeleteBooking}/${bookingId}`);

    }
    else {
      return throwError(() => new Error('User cancelled delete operation'));
    }
  }
}
