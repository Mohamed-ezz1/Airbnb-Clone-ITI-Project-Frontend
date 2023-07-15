import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestToUpdateProfile } from 'src/app/types/ProfileOfUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserProfileUpdateService {



  private apiUrl = 'https://localhost:7108/api/UserDetails';

  constructor(private client: HttpClient) {}

  getUserProfile(): Observable<GestToUpdateProfile> {
    return this.client.get<GestToUpdateProfile>(this.apiUrl);
  }

  updateUserProfile(updatedProfile: GestToUpdateProfile): Observable<GestToUpdateProfile> {
    //console.log("sending data to backend" , updatedProfile)
    console.log("inside service")
    console.log(updatedProfile)
    return this.client.put<GestToUpdateProfile>(this.apiUrl, updatedProfile);
  }
}
