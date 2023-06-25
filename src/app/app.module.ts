import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostLandingComponent } from './Components/User/host-landing/host-landing.component';
import { HostDashboardComponent } from './Components/User/host-dashboard/host-dashboard.component';
import { AddPropertyComponent } from './Components/User/add-property/add-property.component';
import { HostBookingOrdersComponent } from './Components/User/host-booking-orders/host-booking-orders.component';
import { HostPropertiesComponent } from './Components/User/host-properties/host-properties.component';
import { MaterialModule } from './AngularMaterial/material.module';


@NgModule({
  declarations: [
    AppComponent,
    HostLandingComponent,
    HostDashboardComponent,
    AddPropertyComponent,
    HostBookingOrdersComponent,
    HostPropertiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
