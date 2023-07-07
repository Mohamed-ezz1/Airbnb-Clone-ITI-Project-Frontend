import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/User/user.service';
import { LoginDto } from 'src/app/types/LoginDto';
import { Router } from '@angular/router';
import { FormControl, FormGroup ,FormBuilder ,Validators} from '@angular/forms';
import { UsertypeService } from 'src/app/Services/UserType/usertype.service';
import { HostService } from 'src/app/Services/Host/host.service';
import { TabsService } from 'src/app/Services/tabs/tabs.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public StatsLgin: boolean = false;
  public StatsError: boolean = false;
  form!: FormGroup;
  public credentials : LoginDto ={
    userName: "string",
    password: "string",
  };
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private Usertype: UsertypeService,
    private hostservice: HostService,
    private TabsService:TabsService,
    private formBuilder: FormBuilder

  ) { this.TabsService.tab$.next("User")}

  hide = true;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:  ['', Validators.required],
      password: ['', Validators.required],
    });
  }






  handleSubmit(login :FormGroup ) {
    if(login.valid){
  
    this.credentials.userName = login.value["username"]  ;
    this.credentials.password = login.value["password"] ;

    this.authService.login(this.credentials).subscribe({

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



}
