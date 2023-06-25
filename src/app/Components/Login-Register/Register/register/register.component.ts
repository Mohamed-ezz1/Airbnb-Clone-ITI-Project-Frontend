import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { RegisterDto } from 'src/app/types/Register';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  ss: RegisterDto = {

    "firstName": "string",
    "lastttName": "string",
    "userName": "string",
    "email": "string",
    "password": "string"
  }
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ADDuser(Fname: any, Lname: any, UserName: any, email: any, password: any) {


    this.ss["firstName"] = Fname;
    this.ss["lastttName"] = Lname;
    this.ss["userName"] = UserName;
    this.ss["email"] = email;
    this.ss["password"] = password;


    this.authService.AddUser(this.ss).subscribe(

      {
        next: (data) => {
          console.log(data);


        },
        error: (err) => { console.log(err) }
      }

    );

    setTimeout(() => this.router.navigateByUrl('login'), 2000)


  }


}
