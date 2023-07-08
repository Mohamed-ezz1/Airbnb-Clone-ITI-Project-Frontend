import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/Services/Email/email.service';

@Component({
  selector: 'app-emaiforget',
  templateUrl: './emaiforget.component.html',
  styleUrls: ['./emaiforget.component.css']
})
export class EmaiforgetComponent implements OnInit {
  form!: FormGroup;
  found=false

  constructor(    private formBuilder: FormBuilder,
    private router: Router,
    private email:EmailService,

    ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern(/(com|net)$/)]],
    });
  }
  Check(email :FormGroup){
    if(email.valid){
      console.log(email.value.email)
      var xemail =email.value.email;

      this.email.SendEmailto(email.value.email).subscribe({
        
          next:(data) => {
            console.log(data)
         this.router.navigate(['/ValidCard' ,{email:xemail}]);},
         error:(e)=>{
          console.log(e.message)
          this.found= true

         }


      })

    }

  }

}
