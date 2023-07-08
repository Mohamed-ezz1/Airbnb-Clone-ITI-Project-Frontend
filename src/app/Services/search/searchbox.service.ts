import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchboxService {
  myclient:HttpClient

  constructor(myclient : HttpClient) { 

    this.myclient = myclient
  }



  private readonly search = "https://rentifyapiazure.azurewebsites.net/api/SearchBar";

  Searchbarinformation() {
    return this.myclient.get(this.search);

  }

}
