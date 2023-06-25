import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Login-Register/Register/register/register.component';
import { LoginComponent } from './Components/Login-Register/Login/login/login.component';

const routes: Routes = [
  {path:'Register', component:RegisterComponent},
  {path :'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
