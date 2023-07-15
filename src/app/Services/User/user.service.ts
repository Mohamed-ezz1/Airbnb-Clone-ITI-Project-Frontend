import { Injectable } from '@angular/core';
import { LoginDto } from '../../types/LoginDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenDto } from '../../types/TokenDto';
import { HttpClient } from '@angular/common/http';
import { RegisterDto } from '../../types/Register';
import { FormGroup } from '@angular/forms';
import { UsertypeService } from '../UserType/usertype.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient, private UsertypeService: UsertypeService) { }

  private readonly Base_URL = "https://localhost:7108/api/User/Register";


  AddUser(newUser: RegisterDto): Observable<any> {
    console.log(newUser)

    return this.client.post(this.Base_URL, newUser);

  }

  public login(credentials: LoginDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('https://localhost:7108/api/User/Login', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          this.UsertypeService.usertype$.next(this.UsertypeService.getusertype())
          localStorage.setItem('token', tokenDto.token);
        })
      );


  }

}




