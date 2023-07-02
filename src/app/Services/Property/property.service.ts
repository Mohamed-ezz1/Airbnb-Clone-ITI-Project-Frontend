import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private myClient: HttpClient) { }

  private readonly propertyDetailsUrl = "https://localhost:7108/api/Property";

  GetPropertyById(ID:any) {
    return this.myClient.get(this.propertyDetailsUrl+"/"+ID);
  }

}
