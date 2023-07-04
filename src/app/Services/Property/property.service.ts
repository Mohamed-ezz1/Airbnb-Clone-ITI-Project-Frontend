import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private myClient: HttpClient) { }

  private readonly propertyDetailsUrl = "https://localhost:7108/api/Property";
  private readonly propertyBookingUrl = "https://localhost:7108/api/Property/Booking";

  GetPropertyById(ID:any) {
    return this.myClient.get(this.propertyDetailsUrl+"/"+ID);
  }

  PostPropertyBooking(newBooking:any){
    return this.myClient.post(this.propertyBookingUrl, newBooking);
  }


  GetAllPorperty()  {

    return this.myClient.get('https://localhost:7108/api/Home/Properties')
  }



  GetPropertySarch(filter :any){

    
    return this.myClient.post("https://localhost:7108/api/Home/Properties/filter",filter)

  }


  ////

  Getallcatogrey(){

    
    return this.myClient.get("https://localhost:7108/api/Home/Categories")

  }

}
