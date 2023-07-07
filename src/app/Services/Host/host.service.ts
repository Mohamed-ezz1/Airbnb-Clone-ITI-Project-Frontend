import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PropertyAddEditDto } from 'src/app/types/PropertyAddEditDto';
import { UploadFileDto } from 'src/app/types/UploadFileDto';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private myClient: HttpClient, private snackBar: MatSnackBar) { }
  public isHost$ = new BehaviorSubject<string>("Guest");
  public updateSubject$ = new BehaviorSubject<boolean>(false);

  private readonly hostBookingUrl = "https://localhost:7108/api/HostSection/HostBooking";
  private readonly hostPropertyUrl = "https://localhost:7108/api/HostSection/HostProperty";
  private readonly hostPropertyAddEditUrl = "https://localhost:7108/api/HostProperty";
  private readonly hostEditProperty = "https://localhost:7108/api/HostProperty";


  GetBookingByUserId() {
    return this.myClient.get(this.hostBookingUrl);
  }

  GetPropertyByUserId() {
    return this.myClient.get(this.hostPropertyUrl);
  }

  AddProperty(property: PropertyAddEditDto): Observable<any> {
    console.log('Property JSON:', JSON.stringify(property)); // Log the property object
    this.isHost$.next("Host");
    return this.myClient.post<any>(this.hostPropertyAddEditUrl, property);
  }

  GetDataToPopulateFormLists(): Observable<any> {
    return this.myClient.get<any>(this.hostPropertyAddEditUrl);
  }

  UpdateProperty(property: PropertyAddEditDto): Observable<any> {
    console.log("Sending property data to backend:", property); // Log the property data before sending
    setTimeout(() => {
      this.snackBar.open('Property Updated successfully', 'Close', {
        duration: 4000, // Duration in milliseconds
        verticalPosition: 'top'
      });
    }, 300);

    this.updateSubject$.next(true);
    return this.myClient.put<any>(this.hostPropertyAddEditUrl, property);
  }
  GetPropertyById(propertyId: string): Observable<any> {
    const params = new HttpParams().set('id', propertyId);
    return this.myClient.get<any>(`${this.hostEditProperty}/${propertyId}`).pipe(
      tap((data) => {
        console.log("Property Data:", data);
      })
    );
  }


  //This takes a file and return UploadFileDto
  public Upload(file: File): Observable<UploadFileDto> {
    // To send our data as a form data not a json
    var form = new FormData();
    form.append("file", file) //Like we did in post man the key is file and value is the image file itself
    return this.myClient.post<UploadFileDto>('https://localhost:7108/api/Files', form); //we will submit the form
  }

}
