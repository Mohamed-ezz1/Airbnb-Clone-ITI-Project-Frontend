import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Login-Register/Register/register/register.component';
import { LoginComponent } from './Components/Login-Register/Login/login/login.component';
import { HostBookingOrdersComponent } from './Components/User/host-booking-orders/host-booking-orders.component';
import { HostPropertiesComponent } from './Components/User/host-properties/host-properties.component';
import { PropDetailsComponent } from './Components/PropertyDetails/prop-details/prop-details.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AddPropertyComponent } from './Components/User/add-property/add-property.component';
import { HostPropertyUpdateComponent } from './Components/User/host-property-update/host-property-update.component';
import { PropertyComponent } from './Components/Home/PropertyCard/property/property.component';
import { PropBookingComponent } from './Components/PropertyDetails/prop-booking/prop-booking.component';
import { HostDashboardComponent } from './Components/User/host-dashboard/host-dashboard.component';
import { UserProfileUpdateComponent } from './Components/user-profile-update/user-profile-update.component';
import { authenticatonGuard } from './Components/guards/authenticaton.guard';
import { GuestTripsComponent } from './Components/User/guest-trips/guest-trips.component';
import { EmaiforgetComponent } from './Components/Login-Register/EmailForget/emaiforget/emaiforget.component';
import { ValidCardComponent } from './Components/Login-Register/VaildCode/valid-card/valid-card.component';
import { RestPasswordComponent } from './Components/Login-Register/ResetPassword/rest-password/rest-password.component';
const routes: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', canActivate: [authenticatonGuard], component: UserProfileComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'hostBooking', canActivate: [authenticatonGuard], component: HostBookingOrdersComponent },
 
  { path: 'propertyDetails/:id', component: PropDetailsComponent },
  { path: 'addProperty', canActivate: [authenticatonGuard], component: AddPropertyComponent },
  { path: 'editProperty/:id', canActivate: [authenticatonGuard], component: HostPropertyUpdateComponent },
  { path: 'Property/filter', component: PropertyComponent },

  { path: 'Property', component: PropertyComponent },
  { path: 'Property/:id', component: PropertyComponent },
  { path: '', component: PropertyComponent },
  { path: 'HostDashboardComponent',canActivate :[authenticatonGuard], component: HostDashboardComponent },
  {path: 'GuestTrips',canActivate:[authenticatonGuard],component:GuestTripsComponent},
  { path: 'updateProfile', canActivate: [authenticatonGuard], component: UserProfileUpdateComponent },
  { path: 'ForgetPassword', component: EmaiforgetComponent },
  { path: 'ValidCard', component: ValidCardComponent },
  { path: 'RestPassword', component: RestPasswordComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
