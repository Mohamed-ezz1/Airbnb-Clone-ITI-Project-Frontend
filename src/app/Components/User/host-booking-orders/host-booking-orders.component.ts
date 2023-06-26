import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HostService } from 'src/app/Services/Host/host.service';

@Component({
  selector: 'app-host-booking-orders',
  templateUrl: './host-booking-orders.component.html',
  styleUrls: ['./host-booking-orders.component.css']
})
export class HostBookingOrdersComponent implements OnInit {
  displayedColumns: string[] = ['propertyName', 'guestName', 'checkInDate', 'checkOutDate', 'totalPrice'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private hostDataService: HostService) {
  }
  ngOnInit(): void {
    this.hostDataService.GetBookingByUserId().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data),
          this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Get Host Property Completed") }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
