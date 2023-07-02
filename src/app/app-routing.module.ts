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

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hostBooking', component: HostBookingOrdersComponent },
  { path: 'hostProperty', component: HostPropertiesComponent },
  { path: 'propertyDetails/:id', component:PropDetailsComponent},
  { path: 'addProperty', component: AddPropertyComponent },
  {path:'editProperty/:id' , component: HostPropertyUpdateComponent },
  {path:'Property' , component: PropertyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],

})
export class AppRoutingModule { }
