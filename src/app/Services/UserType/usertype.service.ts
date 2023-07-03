import { Injectable } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';
import { UploadFileDto } from 'src/app/types/UploadFileDto';


@Injectable({
  providedIn: 'root'
})
export class UsertypeService {


  constructor(private myclient : HttpClient) { 

  }

  private readonly Usertype = "https://localhost:7108/api/UserDetails/UserType/";

  getusertype() {

   
    
    console.log(this.myclient.get(this.Usertype))
    return this.myclient.get(this.Usertype);

 
}


}
