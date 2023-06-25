import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';
import { HostBookingsDto } from 'src/app/types/HostBookingsDto';

@Component({
  selector: 'app-host-booking-orders',
  templateUrl: './host-booking-orders.component.html',
  styleUrls: ['./host-booking-orders.component.css']
})
export class HostBookingOrdersComponent implements OnInit {
  hostBooking: any;

  constructor(private hostDataService: HostService) {
  }
  ngOnInit(): void {
    this.hostDataService.GetBookingByUserId().subscribe({
      next: (data) => { this.hostBooking = data },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete") }
    })
  }
}
