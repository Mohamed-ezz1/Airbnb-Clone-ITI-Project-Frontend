import { Component } from '@angular/core';
import {   FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { RegisterDto } from 'src/app/types/Register';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  FormGroupDirective,
  NgForm,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf],
})
export class RegisterComponent {
  emailForm = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }





   form = new FormGroup({
    FristName: new FormControl<string>(''),
    LastName: new FormControl<string>(''),
    username: new FormControl<string>(''),
    Email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string>(''),
  });




  
  handleSubmit(e: Event) {

    var credentials = new RegisterDto();
    credentials.firstName = this.form.controls.FristName.value?? '';
    credentials.lastttName = this.form.controls.LastName.value?? '';
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.email = this.emailForm.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

  
      
    this.authService.AddUser(credentials).subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (err) => { console.log(err) }
      }
    );  
  }  
}




  // ADDuser(Fname: any, Lname: any, UserName: any, email: any, password: any) {


  //   this.ss["firstName"] = Fname;
  //   this.ss["lastttName"] = Lname;
  //   this.ss["userName"] = UserName;
  //   this.ss["email"] = email;
  //   this.ss["password"] = password;


  //   this.authService.AddUser(this.ss).subscribe(

  //     {
  //       next: (data) => {
  //         console.log(data);


  //       },
  //       error: (err) => { console.log(err) }
  //     }

  //   );

  //   setTimeout(() => this.router.navigateByUrl('login'), 2000)


  // }
  // ss: RegisterDto = {

  //   "firstName": "string",
  //   "lastttName": "string",
  //   "userName": "string",
  //   "email": "string",
  //   "password": "string"
  // }