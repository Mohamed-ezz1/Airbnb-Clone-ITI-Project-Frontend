import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Login-Register/Register/register/register.component';
import { LoginComponent } from './Components/Login-Register/Login/login/login.component';
import { HostBookingOrdersComponent } from './Components/User/host-booking-orders/host-booking-orders.component';
import { HostPropertiesComponent } from './Components/User/host-properties/host-properties.component';
import { PropDetailsComponent } from './Components/PropertyDetails/prop-details/prop-details.component';

const routes: Routes = [
  {path:'Register', component:RegisterComponent},
  {path :'login', component:LoginComponent},
  { path: 'hostBooking', component: HostBookingOrdersComponent },
  { path: 'hostProperty', component: HostPropertiesComponent },
  { path: 'propertyDetails/:id', component:PropDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
