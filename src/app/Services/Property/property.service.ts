import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyBookingDto } from 'src/app/types/PropertyBookingDto';
import { PropertyDtos } from 'src/app/types/Property';
import { postReviewDto } from 'src/app/types/postReviewDto';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private myClient: HttpClient) { }

  private readonly propertyDetailsUrl = "https://localhost:7108/api/Property";
  private readonly propertyBookingUrl = "https://localhost:7108/api/Property/Booking";
  private readonly checkForReview = "https://localhost:7108/api/Property/checkforRevies";
  private readonly poostReview = "https://localhost:7108/api/Property/addReview";

  private readonly propertyDetailsUrl2 = "https://rentifyapiazure.azurewebsites.net/api/Property";
  private readonly propertyBookingUrl2 = "https://rentifyapiazure.azurewebsites.net/api/Property/Booking";


  GetPropertyById(ID:any) {
    return this.myClient.get(this.propertyDetailsUrl+"/"+ID);
  }

  CheckForReviews(propId:any){
    return this.myClient.get(this.checkForReview+"/"+propId)
  }

  postReview(postReviewDto: postReviewDto){
    return this.myClient.post(this.poostReview, postReviewDto);
  }

  PostPropertyBooking(newBooking:PropertyBookingDto): Observable<any>{
    console.log('Property JSON:', JSON.stringify(newBooking));
    return this.myClient.post(this.propertyBookingUrl, newBooking);
  }


  GetAllPorperty()  {

    return this.myClient.get('https://rentifyapiazure.azurewebsites.net/api/Home/Properties')
  }



  GetPropertySarch(filter :any):Observable<object>{
    console.log("kokokokokokokokokoko")
    console.log(this.myClient.post("https://localhost:7108/api/Home/Properties/filter",filter))

    return this.myClient.post("https://localhost:7108/api/Home/Properties/filter",filter)

  }


  ////

  Getallcatogrey(){

    
    return this.myClient.get("https://localhost:7108/api/Home/Categories")

  }

}
