import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Check_CodeDto } from 'src/app/types/CheckCodeDto';
import { EmailDto } from 'src/app/types/EmailDto';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private myClient: HttpClient) { }
  private readonly SendEmail = "https://localhost:7108/api/User/Forget_Password";
  private readonly ResetPassword = "https://localhost:7108/api/User/Reset_Password";
  private readonly UserCode = "https://localhost:7108/api/User/Check_Code";




  SendEmailto(email:string) : Observable<any>{
    const formData = new FormData();
    formData.append('email', email);

    return this.myClient.post(this.SendEmail, formData)
  }



  CheckCode(UserCode:Check_CodeDto) : Observable<any>{
    return this.myClient.post(this.UserCode, UserCode)
  }



  RestPassword(emailRest:EmailDto) : Observable<any>{

    return this.myClient.post(this.ResetPassword , emailRest)
  }
}
