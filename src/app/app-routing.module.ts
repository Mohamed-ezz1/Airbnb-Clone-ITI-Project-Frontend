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
const routes: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hostBooking', component: HostBookingOrdersComponent },
  { path: 'hostProperty', component: HostPropertiesComponent },
  { path: 'propertyDetails/:id', component: PropDetailsComponent },
  { path: 'addProperty',canActivate :[authenticatonGuard], component: AddPropertyComponent },
  { path: 'editProperty/:id', canActivate :[authenticatonGuard],component: HostPropertyUpdateComponent },
  { path: 'Property', component: PropertyComponent },
  { path: 'HostDashboardComponent', component: HostDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],

})
export class AppRoutingModule { }
