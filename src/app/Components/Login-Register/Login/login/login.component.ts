import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { LoginDto } from 'src/app/Services/types/LoginDto';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  form = new FormGroup({
    username: new FormControl<string>('string'),
    password: new FormControl<string>('string'),
  });

  handleSubmit(e: Event) {
    e.preventDefault();

    var credentials = new LoginDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.login(credentials).subscribe((tokenDto) => {
      console.log(tokenDto);
      this.router.navigateByUrl('');
    });
  }
}
