import { Component, OnInit } from '@angular/core';
import { UserProfileUpdateService } from 'src/app/Services/UserProfileUpdate/user-profile-update.service';
import { GestToUpdateProfile } from 'src/app/types/ProfileOfUserDTO';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {
  userProfile: any={};

  constructor(private userService: UserProfileUpdateService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next:(Profile) => {
        this.userProfile = Profile;
      },
      error:(error) => {
        console.error(error);
      }
  });
  }

  onUpdateUserProfile(): void {
    this.userService.updateUserProfile(this.userProfile).subscribe({
      next:(profile:any) => {
        alert('Profile updated successfully!');

      },
      error:(error) => {
        console.error(error);
        alert('Something went wrong. Please try again later.');

      }
  });
  }
}
