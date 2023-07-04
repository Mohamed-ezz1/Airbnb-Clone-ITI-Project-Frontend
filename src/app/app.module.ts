import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostDashboardComponent } from './Components/User/host-dashboard/host-dashboard.component';
import { AddPropertyComponent } from './Components/User/add-property/add-property.component';
import { HostBookingOrdersComponent } from './Components/User/host-booking-orders/host-booking-orders.component';
import { HostPropertiesComponent } from './Components/User/host-properties/host-properties.component';
import { HostPropertyUpdateComponent } from './Components/User/host-property-update/host-property-update.component';
import { MaterialModule } from './AngularMaterial/material.module';
import { LoginComponent } from './Components/Login-Register/Login/login/login.component';
import { RegisterComponent } from './Components/Login-Register/Register/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AuthenticationInterceptor } from './Components/Interceptors/authentication.interceptor';
import { PropDetailsComponent } from './Components/PropertyDetails/prop-details/prop-details.component';
import { PropBookingComponent } from './Components/PropertyDetails/prop-booking/prop-booking.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { NavbarComponent } from './Components/navbar/navbar/navbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PropertyComponent } from './Components/Home/PropertyCard/property/property.component';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileUpdateComponent } from './Components/user-profile-update/user-profile-update.component';
import { ImagePopupComponent } from './Components/User/image-popup/image-popup.component';
import { imagePopUpdateComponent } from './Components/User/image-pop-update/image-pop-update.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { GuestTripsComponent } from './Components/User/guest-trips/guest-trips.component';
@NgModule({
  declarations: [
    AppComponent,
    HostDashboardComponent,
    AddPropertyComponent,
    HostBookingOrdersComponent,
    HostPropertiesComponent,
    HostPropertyUpdateComponent,
    LoginComponent,
    UserProfileComponent,
    PropDetailsComponent,
    PropBookingComponent,
    NavbarComponent,
    PropertyComponent,
    RegisterComponent,
    ImagePopupComponent,
    imagePopUpdateComponent,
    UserProfileUpdateComponent,
    GuestTripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, NgIf,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MDBBootstrapModule.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,     //For the interceptor
    useClass: AuthenticationInterceptor,
    multi: true,
  },

  { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    // { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
