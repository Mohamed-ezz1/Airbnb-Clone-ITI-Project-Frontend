import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GuestService } from 'src/app/Services/Guest-trips/guest.service';
import { HostService } from 'src/app/Services/Host/host.service';
import { TabsService } from 'src/app/Services/tabs/tabs.service';

@Component({
  selector: 'app-guest-trips',
  templateUrl: './guest-trips.component.html',
  styleUrls: ['./guest-trips.component.css']
})
export class GuestTripsComponent {
  displayedColumns: string[] = ['propertyName', 'hostName', 'checkInDate', 'checkOutDate', 'totalPrice', 'status', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private guestDataService: GuestService, private tabService: TabsService) {
    this.tabService.tab$.next("User");
  }

  ngOnInit(): void {
    this.guestDataService.GetBookingByUserId().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data),
          this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Get Guest Booking Completed") }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBooking(bookingId: string) {
    this.guestDataService.deleteByBookingId(bookingId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((x: any) => x.bookId !== bookingId);
      },
      error: () => { console.log("Error") },
      complete: () => { console.log("Delete Booking Completed") }
    })
  }
}
