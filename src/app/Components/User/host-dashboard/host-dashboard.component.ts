import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { HostService } from 'src/app/Services/Host/host.service';
import { TabsService } from 'src/app/Services/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent {
  showAddProperty: boolean = true;
  showHostProperty: boolean = false;
  showHostBookings: boolean = false;

  constructor(private location: Location, private usertype: UsertypeService, private hostservice: HostService, private tab: TabsService, private route: Router) {
    this.tab.tab$.next("Host");

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
