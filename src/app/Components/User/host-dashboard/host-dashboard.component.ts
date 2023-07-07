import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { HostService } from 'src/app/Services/Host/host.service';
import { TabsService } from 'src/app/Services/tabs/tabs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent implements OnInit {
  showAddProperty: boolean = true;
  showHostProperty: boolean = false;
  showHostBookings: boolean = false;

  constructor(private location: Location,
    private usertype: UsertypeService,
    private propertyUpdateService: HostService,
    private tab: TabsService,
    private snackBar: MatSnackBar) {
    this.tab.tab$.next("Host");

  }

  ngOnInit(): void {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh")

    this.propertyUpdateService.updateSubject$.subscribe((updated) => {
      console.log('Subscription triggered:', updated);
      if (updated) {
        // Toggle to host property view
        this.toggleHostProperty();

        // Delay the snack bar by 1 second
        // setTimeout(() => {
        //   this.snackBar.open('Property Updated successfully', 'Close', {
        //     duration: 4000, // Duration in milliseconds
        //     verticalPosition: 'top'
        //   });
        // }, 1000);
      }
    });
  }



  toggleAddProperty() {
    this.showAddProperty = true;
    this.showHostProperty = false;
    this.showHostBookings = false;
    this.location.go('/HostDashboardComponent/addProperty');
  }

  toggleHostProperty() {
    this.showAddProperty = false;
    this.showHostProperty = true;
    this.showHostBookings = false;
    this.location.go('/HostDashboardComponent/hostProperty');

  }

  toggleHostBookings() {
    this.showAddProperty = false;
    this.showHostProperty = false;
    this.showHostBookings = true;
    this.location.go('/HostDashboardComponent/hostBookings');

  }
}
