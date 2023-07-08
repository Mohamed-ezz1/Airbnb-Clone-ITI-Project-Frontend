import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/Services/Email/email.service';
import { EmailDto } from 'src/app/types/EmailDto';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent {
  form: FormGroup;
  hide = true;
  EmailParams! :string;

  Emailobject :EmailDto ={
    email: "",
    newPassword: "",
    confirmNewPassword: ""
  }


  constructor(private toastr: ToastrService ,private formBuilder: FormBuilder, private codevalid:EmailService,private myRoute: ActivatedRoute ,private router :Router) {
    this.EmailParams = myRoute.snapshot.params["email"];

    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  handleSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value)
      this.Emailobject['email'] =form.value['email']
      this.Emailobject['newPassword'] =form.value['newPassword']
      this.Emailobject['confirmNewPassword'] =form.value['confirmNewPassword']
      console.log(this.Emailobject)

      this.codevalid.RestPassword(this.Emailobject).subscribe({ 
        
        next:(data) => {
          console.log(data)
          this.toastr.success("Done" , "success Rest Password")

          setTimeout
          setTimeout(() => this.router.navigateByUrl('login'), 3000)

        },
         
          error:(e)=>{
            
        console.log(e.message)

       }
      }
     )}
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    if (newPassword !== confirmNewPassword) {
      control.get('confirmNewPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmNewPassword')?.setErrors(null);
    }

    return null;
  }
}
