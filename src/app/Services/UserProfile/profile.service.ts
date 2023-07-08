import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestProfile } from 'src/app/types/ProfileOfUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private Client: HttpClient) { }

  private readonly apiUrl = 'https://rentifyapiazure.azurewebsites.net/api/UserDetails';

  getUserProfile(): Observable<GestProfile> {

    return this.Client.get<GestProfile>(this.apiUrl);

  }

}
