import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsertypeService {

  myclient:HttpClient

  constructor(myclient : HttpClient) { 

    this.myclient = myclient
  }

  private readonly Usertype = "https://localhost:7108/api/UserDetails/UserType";

  getusertype() {
    return this.myclient.get(this.Usertype);

  }
}
