import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { LoginDto } from 'src/app/types/LoginDto';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { HostService } from 'src/app/Services/Host/host.service';
import { TabsService } from 'src/app/Services/tabs/tabs.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public StatsLgin: boolean = false;
  public StatsError: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private Usertype: UsertypeService,
    private hostservice: HostService,
    private TabsService:TabsService
  ) { this.TabsService.tab$.next("User")}

  form = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });





  handleSubmit(e: Event) {
    e.preventDefault();

    var credentials = new LoginDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.login(credentials).subscribe({

      next: (data) => {
        console.log(data);
        this.StatsLgin = true;
        this.StatsError = false;

        this.StatsError = false;
        this.Usertype.getusertype().subscribe((user: any) => {
          let Type = user.userType;
          this.hostservice.isHost$.next(Type);

        });
        this.router.navigate(['/Property']);
        // this.router.navigateByUrl('', { skipLocationChange: false }).then(() =>
        //   window.location.reload());



      },
      error: (err) => {
        console.log(err)

        this.StatsError = true;
        setTimeout(() => this.StatsError = false, 4000)


      }

    }




    );

  }



}
