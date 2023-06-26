import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HostService } from 'src/app/Services/Host/host.service';

@Component({
  selector: 'app-host-properties',
  templateUrl: './host-properties.component.html',
  styleUrls: ['./host-properties.component.css']
})
export class HostPropertiesComponent implements OnInit {

  private hostProperties: any;
  displayedColumns: string[] = ['propertyName', 'Action', 'MaxNumberOfGuests', 'PricePerNight', 'Address'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hostService: HostService ,  private dialog: MatDialog,private snackBar: MatSnackBar ) {

  }

  ngOnInit(): void {
    this.hostService.GetPropertyByUserId().subscribe({
      next: (data :any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete") }
    })
  }

  //From angular material (function for the search bar)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
