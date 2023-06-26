import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Login-Register/Register/register/register.component';
import { LoginComponent } from './Components/Login-Register/Login/login/login.component';
import { PropDetailsComponent } from './Components/PropertyDetails/prop-details/prop-details.component';

const routes: Routes = [
  {path:'Register', component:RegisterComponent},
  {path :'login', component:LoginComponent},
  {path:'propertyDetails', component:PropDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
