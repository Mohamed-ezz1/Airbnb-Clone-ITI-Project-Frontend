import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { RegisterDto } from 'src/app/types/Register';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';

import {
  FormGroupDirective,
  NgForm,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

  // imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, NgIf],
})
export class RegisterComponent implements OnInit {
  [x: string]: any;
  // emailForm = new FormControl('', [Validators.required, Validators.email]);

  // matcher = new MyErrorStateMatcher();
  form2!: FormGroup;
 public xx: RegisterDto = {
    firstName: "string",
    lastttName: "string",
    userName: "string",
    email: "string",
    password: "string"
  };
  constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder , private toastr: ToastrService) { }


  hide = true;

  ngOnInit() {
    this.form2 = this.formBuilder.group({

      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      UserName: ['', Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.pattern(/(com|net)$/)]],
      password: [null, Validators.required],
    });
  }

  register(rgister: FormGroup) : void{
    console.log(rgister.value);
    if (rgister.valid) {

this.xx["firstName"] = rgister.value["FirstName"] ;
this.xx["lastttName"] =rgister.value["LastName"] ;
this.xx["userName"] =rgister.value["UserName"] ;
this.xx["email"] =rgister.value["email"];
this.xx["password"] =rgister.value["password"];
console.log(this.xx)
  

      this.authService.AddUser(this.xx).subscribe(
        {
          next: (data)=>{
        

  this.toastr.success("Done" , "success Register")
  setTimeout(() => this.router.navigateByUrl('login'), 3000)


          },
          error: (err) => { console.log(err)
            console.log(err.error.length)
      
for(var i =0 ;i<err.error.length ; i++ ){

  this.toastr.warning(err.error[i].code)
  this.toastr.warning(err.error[i].description)


}
          }
        }
      );
    }

  }

}



  //  form = new FormGroup({
  //   FristName: new FormControl<string>(''),
  //   LastName: new FormControl<string>(''),
  //   username: new FormControl<string>(''),
  //   Email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl<string>(''),
  // });





  // handleSubmit(e: Event) {

  //   var credentials = new RegisterDto();
  //   credentials.firstName = this.form.controls.FristName.value?? '';
  //   credentials.lastttName = this.form.controls.LastName.value?? '';
  //   credentials.userName = this.form.controls.username.value ?? '';
  //   credentials.email = this.emailForm.value ?? '';
  //   credentials.password = this.form.controls.password.value ?? '';



  //   this.authService.AddUser(credentials).subscribe(
  //     {
  //       next: (data) => {
  //         console.log(data);
  //       },
  //       error: (err) => { console.log(err) }
  //     }
  //   );  
  // }  }




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