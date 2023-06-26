import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/UserProfile/profile.service';
import { GestProfile } from 'src/app/types/ProfileOfUser.js';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile:any ;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUserProfile()
      .subscribe({
        next: (data) => { this.userProfile = data },
        error: (error) => { console.log(error.message) }
        
      })
  }
}
