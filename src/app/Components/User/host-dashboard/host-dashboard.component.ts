import { Component } from '@angular/core';

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent {
  showAddProperty: boolean = true;
  showHostProperty: boolean = false;
  showHostBookings: boolean = false;

  toggleAddProperty() {
    this.showAddProperty = true;
    this.showHostProperty = false;
    this.showHostBookings = false;
  }

  toggleHostProperty() {
    this.showAddProperty = false;
    this.showHostProperty = true;
    this.showHostBookings = false;
  }

  toggleHostBookings() {
    this.showAddProperty = false;
    this.showHostProperty = false;
    this.showHostBookings = true;
  }
}
