import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emaiforget',
  templateUrl: './emaiforget.component.html',
  styleUrls: ['./emaiforget.component.css']
})
export class EmaiforgetComponent implements OnInit {
  form!: FormGroup;

  constructor(    private formBuilder: FormBuilder,
    private router: Router,

    ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern(/(com|net)$/)]],
    });
  }
  Check(email :FormGroup){
    if(email.valid){
      this.router.navigate(['/ValidCard']);

    }

  }

}
