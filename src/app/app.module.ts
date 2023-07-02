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
import { HostPropertyUpdateComponent } from './Components/User/host-property-update/host-property-update.component';
import { MaterialModule } from './AngularMaterial/material.module';
import { LoginComponent } from './Components/Login-Register/Login/login/login.component';
import { RegisterComponent } from './Components/Login-Register/Register/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AuthenticationInterceptor } from './Components/Interceptors/authentication.interceptor';
import { PropDetailsComponent } from './Components/PropertyDetails/prop-details/prop-details.component';
import { PropBookingComponent } from './Components/PropertyDetails/prop-booking/prop-booking.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { PropertyComponent } from './Components/Home/PropertyCard/property/property.component';




@NgModule({
  declarations: [
    AppComponent,
    HostLandingComponent,
    HostDashboardComponent,
    AddPropertyComponent,
    HostBookingOrdersComponent,
    HostPropertiesComponent,
    HostPropertyUpdateComponent,
    LoginComponent,
    UserProfileComponent,
    PropDetailsComponent,
    PropBookingComponent,
    PropertyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,     //For the interceptor
    useClass: AuthenticationInterceptor,
    multi: true,
  },

  { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
