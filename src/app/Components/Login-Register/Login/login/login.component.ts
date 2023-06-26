import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { LoginDto } from 'src/app/types/LoginDto';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  public StatsLgin:boolean =false;
  public StatsError:boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  form = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });




  
  handleSubmit(e: Event) {
    e.preventDefault();

    var credentials = new LoginDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.login(credentials).subscribe( {
      
        next: (data) => {
          console.log(data);
          this.StatsLgin=true;
          this.StatsError=false;
          setTimeout(() =>{ this.StatsError=false  ;
          
            this.router.navigateByUrl('')

          }, 2000)

    
        },
        error: (err) => { console.log(err)
        
          this.StatsError=true;
          setTimeout(() => this.StatsError=false, 4000)


        }
      
    }
    
    

    
    );
    
  }


  
}
