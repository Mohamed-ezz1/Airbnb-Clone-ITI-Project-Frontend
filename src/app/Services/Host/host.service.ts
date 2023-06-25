import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostBookingsDto } from 'src/app/types/HostBookingsDto';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private myClient: HttpClient) { }

  private readonly hostBookingUrl = "https://localhost:7108/HostBooking";
  private readonly hostPropertyUrl = "https://localhost:7108/HostProperty";

  GetBookingByUserId() {
    return this.myClient.get(this.hostBookingUrl);
  }

  GetPropertyByUserId() {
    return this.myClient.get(this.hostPropertyUrl);
  }
}
